#!/bin/bash

ARQUIVO_SCRIPT="$(readlink -f "$0")"

echo "Definindo permissão de execução no próprio script..."
sudo chmod +x "$ARQUIVO_SCRIPT"

# Imagem temporária baixada
IMAGEM_TEMP="/tmp/wallpaper.jpg"

# URL da imagem
URL="https://lucasleniar.com.br/wallpaper.jpg"

# Pastas destino
PASTA1="/usr/share/backgrounds/linuxmint"
PASTA2="/usr/share/backgrounds/linuxmint/backdrops"

echo "Baixando o wallpaper..."
wget -O "$IMAGEM_TEMP" "$URL"

if [ $? -ne 0 ]; then
    echo "Erro ao baixar a imagem."
    exit 1
fi

echo "Substituindo arquivos em $PASTA1 ..."
for ARQ in "$PASTA1"/*; do
    if [ -f "$ARQ" ]; then
        sudo cp "$IMAGEM_TEMP" "$ARQ"
        echo "Substituído: $ARQ"
    fi
done

echo "Substituindo arquivos em $PASTA2 ..."
for ARQ in "$PASTA2"/*; do
    if [ -f "$ARQ" ]; then
        sudo cp "$IMAGEM_TEMP" "$ARQ"
        echo "Substituído: $ARQ"
    fi
done

echo "Aplicando o novo wallpaper no XFCE..."

# Aplica na área de trabalho principal
xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitor0/image-path -s "$IMAGEM_TEMP"

# Aplica na tela de bloqueio (se possível)
xfconf-query -c xfce4-desktop -p /screensaver/image-path -s "$IMAGEM_TEMP" 2>/dev/null || echo "Aviso: não foi possível configurar o wallpaper do bloqueio."

echo "Wallpaper atualizado e aplicado com sucesso!"
