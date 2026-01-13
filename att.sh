#!/bin/bash
export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

# Script adaptado para usar servidor pessoal e ignorar travas Educatron
export NC="\033[0m"
export VERDE="\033[0;42m"
export VERMELHO="\033[0;41m"

arqLogDisto="/var/log/troca-wallpaper-custom.log"
echo "Iniciando execucao em $(date)" >> "$arqLogDisto"

# 1. Verificação de ROOT
if [ "$EUID" -ne 0 ]; then 
  echo -e "${VERMELHO}Erro: Execute como root (sudo)${NC}"
  exit 1
fi

# 2. Limpeza de processos antigos
killall trocando-fundo-tela.sh 2>/dev/null
systemctl stop trocando-fundo-de-tela.service 2>/dev/null

# 3. Criação de diretórios necessários
mkdir -p /root/bin
mkdir -p /root/imgs-para-fundo-tela/papeldeparede
mkdir -p /root/arquivos_originais

# 4. Criando o script de sincronização e troca (O CORAÇÃO DO SISTEMA)
cat > "/root/bin/trocando-fundo-tela.sh" << 'EOF_TROCAR_FUNDO_TELA'
#!/bin/bash
# Configurações do Servidor
URL_IMG="https://lucasleniar.com.br/wallpaper.jpg"
URL_VER="https://lucasleniar.com.br/version.txt"
DIR_BASE="/root/imgs-para-fundo-tela"
ARQ_LOCAL="$DIR_BASE/wallpaper.jpg"
VER_LOCAL="$DIR_BASE/versao_atual.txt"
arqLogDisto="/var/log/troca-wallpaper-status.log"

verificar_atualizacao() {
    mkdir -p "$DIR_BASE/papeldeparede"
    cd "$DIR_BASE"
    
    # Tenta baixar a versão remota
    wget -qO /tmp/v_remota.txt "$URL_VER"
    
    V_REMOTA=$(cat /tmp/v_remota.txt 2>/dev/null)
    V_ATUAL=$(cat "$VER_LOCAL" 2>/dev/null)

    if [ "$V_REMOTA" != "$V_ATUAL" ] || [ ! -f "$ARQ_LOCAL" ]; then
        echo "$(date): Nova versao ($V_REMOTA) detectada. Baixando..." >> "$arqLogDisto"
        if wget -qO "$ARQ_LOCAL" "$URL_IMG"; then
            cp /tmp/v_remota.txt "$VER_LOCAL"
            cp "$ARQ_LOCAL" "$DIR_BASE/papeldeparede/wallpaper.jpg"
        fi
    fi
}

# Loop de aplicação do Wallpaper
while true; do
    verificar_atualizacao
    
    IMAGEM_PARA_USAR="$DIR_BASE/papeldeparede/wallpaper.jpg"
    
    if [ -f "$IMAGEM_PARA_USAR" ]; then
        # Detecta usuários logados e aplica o wallpaper para cada um
        for usuario in $(users | tr ' ' '\n' | sort -u); do
            # Se for Cinnamon
            sudo -u "$usuario" DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$(id -u $usuario)/bus \
            gsettings set org.cinnamon.desktop.background picture-uri "file://$IMAGEM_PARA_USAR" 2>/dev/null
            
            # Se for XFCE
            sudo -u "$usuario" DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$(id -u $usuario)/bus \
            xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitor0/workspace0/last-image -s "$IMAGEM_PARA_USAR" 2>/dev/null
        done
    fi
    
    sleep 300 # Verifica atualizações a cada 5 minutos
done
EOF_TROCAR_FUNDO_TELA

chmod +x /root/bin/trocando-fundo-tela.sh

# 5. Criando o Serviço do Sistema (SystemD) para rodar sempre
cat > "/etc/systemd/system/trocando-fundo-de-tela.service" << EOF
[Unit]
Description=Servico de Troca de Papel de Parede Personalizado
After=network.target

[Service]
Type=simple
ExecStart=/root/bin/trocando-fundo-tela.sh
Restart=always
User=root

[Install]
WantedBy=multi-user.target
EOF

# 6. Ativando o serviço
systemctl daemon-reload
systemctl enable trocando-fundo-de-tela.service
systemctl start trocando-fundo-de-tela.service

echo -e "${VERDE}Sucesso! O script está rodando e monitorando seu site.${NC}"
echo "Logs podem ser vistos em: tail -f /var/log/troca-wallpaper-status.log"