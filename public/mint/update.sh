#!/bin/bash

# Interrompe se não estiver rodando como administrador (root)
if [ "$EUID" -ne 0 ]; then
  echo "Por favor, execute este comando com sudo."
  exit 1
fi

SCRIPT_PATH="/usr/local/bin/auto-update-mint.sh"

# 1. Escreve o script definitivo direto no diretório do sistema
cat << 'EOF' > "$SCRIPT_PATH"
#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
REMOTE_URL="https://www.lucasleniar.com.br/mint/apt-version.txt"
LOCAL_FILE="/var/log/mint_update_version.txt"

REMOTE_DATE=$(curl -sL "$REMOTE_URL" | tr -d '[:space:]')
if [[ ! "$REMOTE_DATE" =~ ^[0-9]{8}$ ]]; then exit 1; fi

if [ -f "$LOCAL_FILE" ]; then
    LOCAL_DATE=$(cat "$LOCAL_FILE" | tr -d '[:space:]')
else
    LOCAL_DATE=0
fi

if [ "$REMOTE_DATE" -gt "$LOCAL_DATE" ]; then
    apt-get update -y
    apt-get upgrade -y
    apt-get autoremove -y
    echo "$REMOTE_DATE" > "$LOCAL_FILE"
fi
EOF

# 2. Concede a permissão de execução automaticamente
chmod +x "$SCRIPT_PATH"

# 3. Adiciona a automação no crontab do root (evita duplicatas se rodar duas vezes)
if ! crontab -l 2>/dev/null | grep -q "$SCRIPT_PATH"; then
    (crontab -l 2>/dev/null; echo "0 * * * * $SCRIPT_PATH > /var/log/auto-update-mint.log 2>&1") | crontab -
fi

# 4. Roda a primeira verificação imediatamente
"$SCRIPT_PATH"

echo "Instalação concluída: Permissões aplicadas e automação agendada."
