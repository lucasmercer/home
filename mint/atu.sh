#!/bin/bash

BASE_URL="http://jonilso.com"

echo "Iniciando a automação de configuração..."

scripts=(
    "h.sh"
    "ro.sh"
    "vnc.sh"
    "tb.sh"
    "rb.sh"
    "lg.sh"
    "anpi.sh"
    "avahi.sh"
)

echo "Instalando SSH..."
sudo apt-get update && sudo apt-get install -y ssh

for script in "${scripts[@]}"; do
    echo "Baixando e executando $script..."
    wget -q "$BASE_URL/$script" -O "$script"
    chmod +x "$script"
    sudo bash "$script"
done

echo "Executando script final p2.sh..."
wget -q "$BASE_URL/p2.sh" -O p2.sh
chmod +x p2.sh
sudo bash p2.sh 10.202.252.0/22 41145690

echo "Processo concluído com sucesso!"
