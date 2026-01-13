#!/bin/bash
# ==========================================================================
# Script de Wallpaper - Lucas Leniar (Versão Global corrigida)
# ==========================================================================

export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

if [ "$EUID" -ne 0 ]; then 
  echo "Erro: Execute como sudo."
  exit 1
fi

systemctl stop lucas-wallpaper.service 2>/dev/null
systemctl stop trocando-fundo-de-tela.service 2>/dev/null

mkdir -p /var/local/lucas-wallpaper
VER_LOCAL="/var/local/lucas-wallpaper/versao.txt"

cat > "/usr/local/bin/lucas-wallpaper-monitor.sh" << 'EOF_LUCAS'
#!/bin/bash

URL_IMG="https://lucasleniar.com.br/wallpaper.jpg"
URL_VER="https://lucasleniar.com.br/version.txt"
VER_LOCAL="/var/local/lucas-wallpaper/versao.txt"
TEMP_IMG="/tmp/wallpaper_novo.jpg"

PATHS=(
    "/usr/share/backgrounds/linuxmint/default_background.jpg"
    "/usr/share/backgrounds/linuxmint/linuxmint.jpg"
    "/usr/share/xfce4/backdrops/default_background.jpg"
    "/usr/share/xfce4/backdrops/linuxmint.jpg"
)

verificar_e_substituir() {
    wget -qO /tmp/v_remota.txt "$URL_VER"
    V_REMOTA=$(cat /tmp/v_remota.txt 2>/dev/null | tr -d -c '0-9')
    V_ATUAL=$(cat "$VER_LOCAL" 2>/dev/null | tr -d -c '0-9')

    [ -z "$V_ATUAL" ] && V_ATUAL=0
    [ -z "$V_REMOTA" ] && V_REMOTA=0

    if [ "$V_REMOTA" -gt "$V_ATUAL" ] || [ ! -f "${PATHS[0]}" ]; then
        echo "$(date): Nova versao $V_REMOTA detetada. Atualizando..." >> /var/log/wallpaper_custom.log
        
        if wget -qO "$TEMP_IMG" "$URL_IMG"; then
            echo "$V_REMOTA" > "$VER_LOCAL"
            for i in "${PATHS[@]}"; do
                dir=$(dirname "$i")
                mkdir -p "$dir"
                cp "$TEMP_IMG" "$i"
                chmod 644 "$i"
            done
            
            for usuario in $(who | cut -d' ' -f1 | sort -u); do
                U_ID=$(id -u "$usuario")
                BUS="unix:path=/run/user/$U_ID/bus"
                sudo -u "$usuario" DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS="$BUS" gsettings set org.cinnamon.desktop.background picture-options 'spanned' 2>/dev/null
                sudo -u "$usuario" DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS="$BUS" gsettings set org.cinnamon.desktop.background picture-options 'zoom' 2>/dev/null
            done
        fi
    fi
}

while true; do
    verificar_e_substituir
    sleep 3600
done
EOF_LUCAS

chmod +x /usr/local/bin/lucas-wallpaper-monitor.sh

cat > "/etc/systemd/system/lucas-wallpaper.service" << EOF
[Unit]
Description=Servico de Wallpaper Lucas Leniar (Global)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/usr/local/bin/lucas-wallpaper-monitor.sh
Restart=always
User=root

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable lucas-wallpaper.service
systemctl start lucas-wallpaper.service

echo "-------------------------------------------------------"
echo "CONCLUÍDO! O sistema de monitoramento está ativo."
echo "-------------------------------------------------------"


