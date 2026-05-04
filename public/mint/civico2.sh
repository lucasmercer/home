#!/usr/bin/env bash

set -e

BASE_URL="http://jonilso.com"

echo "Iniciando a automação de configuração..."

scripts=(
    re.sh
    cert.sh
    h.sh
    ape.sh
    ro.sh
    vnc.sh
    tb.sh
    rb.sh
    lg.sh
    anpi.sh
    avahi.sh
)

# ===============================
# Verificando downloader
# ===============================
if command -v wget >/dev/null 2>&1; then
    DL="wget -q -O"
elif command -v curl >/dev/null 2>&1; then
    DL="curl -fsSL -o"
else
    echo "Erro: instale wget ou curl"
    exit 1
fi

# ===============================
# Atualização e pacotes básicos
# ===============================
echo "Atualizando sistema e instalando dependências..."

sudo apt-get update

sudo apt-get install -y \
    sshpass \
    fping \
    openssh-client \
    openssh-server

# ===============================
# Download e execução dos scripts
# ===============================
for script in "${scripts[@]}"; do
    echo "Baixando e executando $script..."

    $DL "$script" "$BASE_URL/$script"

    chmod +x "$script"
    sudo bash "$script"
done

# ===============================
# Script final
# ===============================
echo "===================================="
echo "Configuração final (p2.sh)"
echo "===================================="

read -rp "Digite o IP com máscara (ex: 10.0.0.1/24): " IP_REDE
read -rp "Digite o INEP do colégio: " INEP

echo "Executando script final p2.sh..."

$DL p2.sh "$BASE_URL/p2.sh"
chmod +x p2.sh
sudo bash p2.sh "$IP_REDE" "$INEP"

# ===============================
# Wallpaper
# ===============================
$DL 2-wallpaper.sh "http://lucasleniar.com.br/mint/2-wallpaper.sh"
chmod +x 2-wallpaper.sh
sudo bash 2-wallpaper.sh

echo "Processo concluído com sucesso!"

