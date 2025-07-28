#!/bin/bash
if [ "$EUID" -ne 0 ]; then 
  echo " Este script precisa ser executado como root."
  echo "   Use: sudo $0"
  exit 1
fi

CONFIG_DIR="/etc/lightdm/lightdm.conf.d"
CONFIG_FILE="$CONFIG_DIR/50-no-guest.conf"

mkdir -p "$CONFIG_DIR"

cat <<EOF > "$CONFIG_FILE"
[Seat:*]
allow-guest=false
EOF

echo ""
echo " Login de convidado (guest) desabilitado com sucesso!"
echo " Arquivo de configuração criado/modificado: $CONFIG_FILE"
echo ""
echo " Script desenvolvido por: Lucas Leniar"
echo " Contato: lucas.leniar@escola.pr.gov.br"
echo ""
echo " Para aplicar as alterações, reinicie o sistema ou o serviço do gerenciador de exibição:"
echo "   sudo systemctl restart lightdm"
