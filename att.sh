#!/bin/bash
# ==========================================================================
# Script de Atualização de Papel de Parede - Versão Independente (Cronológica)
# Link: https://lucasleniar.com.br/wallpaper.jpg
# ==========================================================================

export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
export NC="\033[0m"
export VERDE="\033[0;42m"
export VERMELHO="\033[0;41m"

# 1. Verificação de privilégios de ROOT
if [ "$EUID" -ne 0 ]; then 
  echo -e "${VERMELHO}Erro: Este script precisa ser executado como root (sudo).${NC}"
  exit 1
fi

echo "Iniciando configuração de Papel de Parede Personalizado..."

# 2. Limpeza de processos e serviços antigos da escola (se existirem)
killall trocando-fundo-tela.sh 2>/dev/null
systemctl stop trocando-fundo-de-tela.service 2>/dev/null

# 3. Criação da estrutura de pastas
mkdir -p /root/bin
mkdir -p /root/imgs-para-fundo-tela/papeldeparede

# 4. CRIAÇÃO DO SCRIPT DE LOOP (O que fica rodando em segundo plano)
cat > "/root/bin/trocando-fundo-tela.sh" << 'EOF_TROCAR'
#!/bin/bash

# Configurações do seu servidor pessoal
URL_IMG="https://lucasleniar.com.br/wallpaper.jpg"
URL_VER="https://lucasleniar.com.br/version.txt"

DIR_BASE="/root/imgs-para-fundo-tela"
ARQ_LOCAL="$DIR_BASE/wallpaper.jpg"
VER_LOCAL="$DIR_BASE/versao_atual.txt"
LOG_ARQ="/var/log/wallpaper_custom.log"

verificar_cronologia() {
    # Garante que a pasta existe
    mkdir -p "$DIR_BASE/papeldeparede"
    
    # 1. Tenta baixar o arquivo de versão do servidor
    wget -qO /tmp/v_remota.txt "$URL_VER"
    
    # 2. Limpa os dados (remove espaços ou caracteres estranhos)
    V_REMOTA=$(cat /tmp/v_remota.txt 2>/dev/null | tr -d -c '0-9')
    V_ATUAL=$(cat "$VER_LOCAL" 2>/dev/null | tr -d -c '0-9')

    # 3. Se não houver versão local, define como 0
    [ -z "$V_ATUAL" ] && V_ATUAL=0
    [ -z "$V_REMOTA" ] && V_REMOTA=0

    # 4. COMPARAÇÃO CRONOLÓGICA (Só baixa se a remota for MAIOR que a local)
    if [ "$V_REMOTA" -gt "$V_ATUAL" ] || [ ! -f "$ARQ_LOCAL" ]; then
        echo "$(date): Nova versao encontrada ($V_REMOTA). Versao antiga era ($V_ATUAL). Baixando..." >> "$LOG_ARQ"
        
        if wget -qO "$ARQ_LOCAL" "$URL_IMG"; then
            echo "$V_REMOTA" > "$VER_LOCAL"
            cp "$ARQ_LOCAL" "$DIR_BASE/papeldeparede/wallpaper.jpg"
            return 0 # Indica que houve atualização
        fi
    else
        echo "$(date): Versao local ($V_ATUAL) esta atualizada em relacao ao servidor ($V_REMOTA)." >> "$LOG_ARQ"
    fi
    return 1
}

while true; do
    # Verifica atualização
    verificar_cronologia
    
    IMG_FINAL="$DIR_BASE/papeldeparede/wallpaper.jpg"
    
    if [ -f "$IMG_FINAL" ]; then
        # Aplica para todos os usuários logados na interface gráfica
        for usuario in $(users | tr ' ' '\n' | sort -u); do
            USER_ID=$(id -u "$usuario")
            # Comandos para Cinnamon e XFCE
            sudo -u "$usuario" DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$USER_ID/bus \
            gsettings set org.cinnamon.desktop.background picture-uri "file://$IMG_FINAL" 2>/dev/null
            
            sudo -u "$usuario" DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$USER_ID/bus \
            xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitor0/workspace0/last-image -s "$IMG_FINAL" 2>/dev/null
        done
    fi
    
    sleep 600 # Verifica novamente em 10 minutos
done
EOF_TROCAR

chmod +x /root/bin/trocando-fundo-tela.sh

# 5. CRIAÇÃO DO SERVIÇO SYSTEMD (Para iniciar com o PC)
cat > "/etc/systemd/system/trocando-fundo-de-tela.service" << EOF
[Unit]
Description=Servico de Wallpaper Cronologico Lucas Leniar
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/root/bin/trocando-fundo-tela.sh
Restart=always
RestartSec=10
User=root

[Install]
WantedBy=multi-user.target
EOF

# 6. Ativação e Início imediato
systemctl daemon-reload
systemctl enable trocando-fundo-de-tela.service
systemctl start trocando-fundo-de-tela.service

echo -e "${VERDE}Concluído!${NC}"
echo "O sistema agora monitora a cronologia em: https://lucasleniar.com.br/version.txt"
echo "Para ver o que está acontecendo, use: tail -f /var/log/wallpaper_custom.log"
