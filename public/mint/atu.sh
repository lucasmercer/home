#!/bin/bash

BASE_URL="http://jonilso.com"

echo "Iniciando a automação de configuração..."

scripts=(
    "re.sh"
    "cert.sh"
    "h.sh"
    "ape.sh"
    "ro.sh"
    "vnc.sh"
    "tb.sh"
    "rb.sh"
    "lg.sh"
    "anpi.sh"
    "avahi.sh"
)

echo "Instalando SSH..."

sudo apt-get  install -y sshpass fping
sudo apt-get update && sudo apt-get install -y ssh

for script in "${scripts[@]}"; do
    echo "Baixando e executando $script..."
    wget -q "$BASE_URL/$script" -O "$script"
    chmod +x "$script"
    sudo bash "$script"
done

echo "===================================="
echo "Configuração final (p2.sh)"
echo "===================================="

read -p "Digite o IP com máscara (ex: 10.0.0.1/24): " IP_REDE

read -p "Digite o INEP do colégio: " INEP

echo "Executando script final p2.sh..."
wget -q "$BASE_URL/p2.sh" -O p2.sh
chmod +x p2.sh
sudo bash p2.sh "$IP_REDE" "$INEP"

echo "Processo concluído com sucesso!"
