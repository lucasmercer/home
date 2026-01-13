#!/bin/bash
# ==========================================================================
# Script de Gestão de Papel de Parede - Versão Independente
# Autor: Adaptado para Lucas Leniar | Lógica: Cronologia Numérica (AAAAMMDD)
# ==========================================================================

export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
export NC="\033[0m"
export VERDE="\033[0;42m"
export VERMELHO="\033[0;41m"

# 1. Verificação de permissões de ROOT
if [ "$EUID" -ne 0 ]; then 
  echo -e "${VERMELHO}Erro: Precisas de executar este script com sudo.${NC}"
  exit 1
fi

echo -e "${VERDE}A iniciar a configuração do Wallpaper Customizado...${NC}"

# 2. Parar serviços antigos (se existirem)
systemctl stop trocando-fundo-de-tela.service 2>/dev/null
killall trocando-fundo-tela.sh 2>/dev/null

# 3. Criar estrutura de pastas
mkdir -p /root/bin
mkdir -p /root/imgs-para-fundo-tela/papeldeparede

# 4. CRIAR O SCRIPT QUE MONITORIZA O TEU SITE
# Este ficheiro ficará guardado em /root/bin/trocando-fundo-tela.sh
cat > "/root/bin/trocando-fundo-tela.sh" << 'EOF_LUCAS'
#!/bin/bash

# Configurações do teu Servidor
URL_IMG="https://lucasleniar.com.br/wallpaper.jpg"
URL_VER="https://lucasleniar.com.br/version.txt"

DIR_BASE="/root/imgs-para-fundo-tela"
ARQ_LOCAL="$DIR_BASE/wallpaper.jpg"
VER_LOCAL="$DIR_BASE/versao_atual.txt"
LOG_SISTEMA="/var/log/wallpaper_custom.log"

verificar_e_atualizar() {
    mkdir -p "$DIR_BASE/papeldeparede"
    
    # 1. Descarrega a versão que está no teu site para uma pasta temporária
    wget -qO /tmp/v_remota.txt "$URL_VER"
    
    # 2. Limpa o texto: deixa apenas os números (ex: 20260112)
    V_REMOTA=$(cat /tmp/v_remota.txt 2>/dev/null | tr -d -c '0-9')
    V_ATUAL=$(cat "$VER_LOCAL" 2>/dev/null | tr -d -c '0-9')

    # Se o ficheiro local não existir, assume versão 0
    [ -z "$V_ATUAL" ] && V_ATUAL=0
    [ -z "$V_REMOTA" ] && V_REMOTA=0

    # 3. COMPARAÇÃO CRONOLÓGICA (Só descarrega se a versão do site for MAIOR que a do PC)
    if [ "$V_REMOTA" -gt "$V_ATUAL" ] || [ ! -f "$ARQ_LOCAL" ]; then
        echo "$(date): Nova imagem detetada (Versão $V_REMOTA). A descarregar..." >> "$LOG_SISTEMA"
        
        # Tenta descarregar a imagem. Se conseguir, guarda a nova versão.
        if wget -qO "$ARQ_LOCAL" "$URL_IMG"; then
            echo "$V_REMOTA" > "$VER_LOCAL"
            cp "$ARQ_LOCAL" "$DIR_BASE/papeldeparede/wallpaper.jpg"
            return 0 # Sucesso
        fi
    fi
    return 1 # Sem novidades
}

while true; do
    # Verifica se há atualizações no teu site
    verificar_e_atualizar
    
    IMG_PARA_APLICAR="$DIR_BASE/papeldeparede/wallpaper.jpg"
    
    if [ -f "$IMG_PARA_APLICAR" ]; then
        # Aplica a imagem para todos os utilizadores que estiverem logados
        for usuario in $(users | tr ' ' '\n' | sort -u); do
            U_ID=$(id -u "$usuario")
            
            # Comando para ambiente Cinnamon (Linux Mint)
            sudo -u "$usuario" DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$U_ID/bus \
            gsettings set org.cinnamon.desktop.background picture-uri "file://$IMG_PARA_APLICAR" 2>/dev/null
            
            # Comando para ambiente XFCE (Educatron/Outros)
            sudo -u "$usuario" DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$U_ID/bus \
            xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitor0/workspace0/last-image -s "$IMG_PARA_APLICAR" 2>/dev/null
        done
    fi
    
    # Espera 10 minutos (600 segundos) antes de verificar o site novamente
    sleep 600
done
EOF_LUCAS

# Dar permissão de execução ao script interno
chmod +x /root/bin/trocando-fundo-tela.sh

# 5. CRIAR O SERVIÇO QUE FAZ O SCRIPT RODAR SOZINHO NO ARRANQUE
cat > "/etc/systemd/system/trocando-fundo-de-tela.service" << EOF
[Unit]
Description=Servico de Wallpaper Lucas Leniar
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/root/bin/trocando-fundo-tela.sh
Restart=always
RestartSec=20
User=root

[Install]
WantedBy=multi-user.target
EOF

# 6. Ativar e Iniciar o Serviço
systemctl daemon-reload
systemctl enable trocando-fundo-de-tela.service
systemctl start trocando-fundo-de-tela.service

echo -e "${VERDE}-------------------------------------------------------${NC}"
echo -e "${VERDE}CONCLUÍDO! O PC agora monitoriza o teu site.${NC}"
echo -e "Imagem: https://lucasleniar.com.br/wallpaper.jpg"
echo -e "Versão: https://lucasleniar.com.br/version.txt"
echo -e "Logs em: tail -f /var/log/wallpaper_custom.log"
echo -e "${VERDE}-------------------------------------------------------${NC}"