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
PASTA_PADRAO="/usr/share/backgrounds/linuxmint"
ARQUIVO_DEFAULT="$PASTA_PADRAO/default_background.jpg"

echo "Baixando o wallpaper..."
wget -O "$IMAGEM_TEMP" "$URL"

if [ $? -ne 0 ]; then
    echo "Erro ao baixar a imagem."
    exit 1
fi

# Mudar o wallpaper temporariamente para evitar conflitos
echo "Mudando o wallpaper temporariamente para evitar conflito..."
xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitor0/image-path -s "/usr/share/backgrounds/linuxmint/another_wallpaper.jpg"

# Substituindo arquivos em $PASTA1 ...
echo "Substituindo arquivos em $PASTA1 ..."
for ARQ in "$PASTA1"/*; do
    if [ -f "$ARQ" ]; then
        sudo cp "$IMAGEM_TEMP" "$ARQ"
        echo "Substituído: $ARQ"
    fi
done

# Substituindo arquivos em $PASTA2 ...
echo "Substituindo arquivos em $PASTA2 ..."
for ARQ in "$PASTA2"/*; do
    if [ -f "$ARQ" ]; then
        sudo cp "$IMAGEM_TEMP" "$ARQ"
        echo "Substituído: $ARQ"
    fi
done

# Substituindo o arquivo default_background.jpg
echo "Substituindo o arquivo default_background.jpg..."
if [ -f "$ARQUIVO_DEFAULT" ]; then
    sudo cp "$IMAGEM_TEMP" "$ARQUIVO_DEFAULT"
    echo "Arquivo default_background.jpg substituído com sucesso!"
else
    echo "Erro: arquivo default_background.jpg não encontrado."
fi

# Aplicando o novo wallpaper no XFCE...

# Aplica na área de trabalho principal
echo "Aplicando o novo wallpaper na área de trabalho..."
xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitor0/image-path --create -t string -s "$IMAGEM_TEMP"

# Aplica na tela de bloqueio (se possível)
echo "Aplicando o novo wallpaper na tela de bloqueio..."
xfconf-query -c xfce4-desktop -p /screensaver/image-path --create -t string -s "$IMAGEM_TEMP" 2>/dev/null || echo "Aviso: não foi possível configurar o wallpaper do bloqueio."

# Forçar a atualização da área de trabalho
echo "Forçando atualização da área de trabalho..."
# Executar xfdesktop no ambiente do usuário (evita erro de SESSION_MANAGER)
DISPLAY=:0 XAUTHORITY=$HOME/.Xauthority xfdesktop --reload

echo "Wallpaper atualizado e aplicado com sucesso!"

