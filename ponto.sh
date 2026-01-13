#!/bin/bash
# ==========================================================================
# Script de Gestão Unificada - Lucas Leniar
# Wallpaper Automático + Atalho Ponto SEED (Global)
# ==========================================================================

# CONFIGURAÇÕES - WALLPAPER
URL_IMG_WALL="https://lucasleniar.com.br/wallpaper.jpg"
URL_VER_WALL="https://lucasleniar.com.br/version.txt"
VER_LOCAL="/var/local/lucas-wallpaper/versao.txt"

# CONFIGURAÇÕES - PONTO SEED
URL_ICONE_PONTO="https://lucasleniar.com.br/registropontolucas.jpg"
URL_PONTO="https://registropontoseed.pr.gov.br"
CAMINHO_ICONE_PONTO="/usr/share/icons/registroponto.jpg"
NOME_APP_PONTO="Ponto_SEED.desktop"

if [ "$EUID" -ne 0 ]; then 
  echo "Erro: Execute como sudo (sudo bash gestao_lucas.sh)"
  exit 1
fi

echo "Iniciando Configuração Global..."

# --- 1. PREPARAÇÃO DO SISTEMA ---
mkdir -p /var/local/lucas-wallpaper
mkdir -p /usr/share/backgrounds/lucas-custom
chmod 755 /usr/share/backgrounds/lucas-custom

# Baixar ícone do Ponto
wget -qO "$CAMINHO_ICONE_PONTO" "$URL_ICONE_PONTO"
chmod 644 "$CAMINHO_ICONE_PONTO"

# --- 2. CRIAR ARQUIVO .DESKTOP MESTRE (PONTO SEED) ---
cat > "/usr/share/applications/$NOME_APP_PONTO" <<EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=Registro Ponto SEED
Comment=Acesso ao Ponto SEED
Exec=firefox -new-window "$URL_PONTO"
Icon=$CAMINHO_ICONE_PONTO
Terminal=false
StartupNotify=true
Categories=Network;WebBrowser;
X-Cinnamon-Legacy-Icon-Support=true
EOF
chmod 644 "/usr/share/applications/$NOME_APP_PONTO"

# --- 3. CRIAR O SCRIPT MONITOR DE WALLPAPER ---
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

while true; do
    wget -qO /tmp/v_remota.txt "$URL_VER"
    V_REMOTA=$(cat /tmp/v_remota.txt 2>/dev/null | tr -d -c '0-9')
    V_ATUAL=$(cat "$VER_LOCAL" 2>/dev/null | tr -d -c '0-9')
    [ -z "$V_ATUAL" ] && V_ATUAL=0
    [ -z "$V_REMOTA" ] && V_REMOTA=0

    if [ "$V_REMOTA" -gt "$V_ATUAL" ] || [ ! -f "${PATHS[0]}" ]; then
        if wget -qO "$TEMP_IMG" "$URL_IMG"; then
            echo "$V_REMOTA" > "$VER_LOCAL"
            for i in "${PATHS[@]}"; do
                dir=$(dirname "$i")
                mkdir -p "$dir"
                cp "$TEMP_IMG" "$i"
                chmod 644 "$i"
            done
            # Notifica usuários logados para atualizar o fundo
            for usuario in $(who | cut -d' ' -f1 | sort -u); do
                U_ID=$(id -u "$usuario")
                BUS="unix:path=/run/user/$U_ID/bus"
                sudo -u "$usuario" DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS="$BUS" gsettings set org.cinnamon.desktop.background picture-options 'spanned' 2>/dev/null
                sudo -u "$usuario" DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS="$BUS" gsettings set org.cinnamon.desktop.background picture-options 'zoom' 2>/dev/null
            done
        fi
    fi
    sleep 3600 # Verifica a cada 1 hora
done
EOF_LUCAS
chmod +x /usr/local/bin/lucas-wallpaper-monitor.sh

# --- 4. CRIAR O FIXADOR DE ATALHOS (AUTOSTART GLOBAL) ---
mkdir -p /etc/xdg/autostart
cat > "/etc/xdg/autostart/gestao-lucas-startup.desktop" <<EOF
[Desktop Entry]
Type=Application
Name=Gestao Lucas Fixer
Exec=bash -c 'DESKTOP_DIR=\$(xdg-user-dir DESKTOP); cp /usr/share/applications/$NOME_APP_PONTO "\$DESKTOP_DIR/"; chmod +x "\$DESKTOP_DIR/$NOME_APP_PONTO"; gio set "\$DESKTOP_DIR/$NOME_APP_PONTO" metadata::trusted true'
NoDisplay=true
EOF

# --- 5. CONFIGURAR SERVIÇO SYSTEMD (WALLPAPER) ---
cat > "/etc/systemd/system/lucas-gestion.service" << EOF
[Unit]
Description=Servico de Gestao Lucas Leniar (Wallpaper Global)
After=network-online.target

[Service]
Type=simple
ExecStart=/usr/local/bin/lucas-wallpaper-monitor.sh
Restart=always
User=root

[Install]
WantedBy=multi-user.target
EOF

# --- 6. ATIVAR TUDO ---
systemctl daemon-reload
systemctl enable lucas-gestion.service
systemctl restart lucas-gestion.service

# Limpar instalações antigas
systemctl stop lucas-wallpaper.service 2>/dev/null
systemctl disable lucas-wallpaper.service 2>/dev/null

echo "-------------------------------------------------------"
echo "CONCLUÍDO! O computador está agora sob gestão unificada."
echo "1. Wallpaper: Monitoramento de 1 em 1 hora ativo."
echo "2. Ponto SEED: Atalho configurado para todos os usuários."
echo "-------------------------------------------------------"
