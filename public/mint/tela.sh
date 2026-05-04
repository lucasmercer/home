#!/bin/bash
# ============================================================================
# Instalador Global de Wallpaper - Lucas Leniar
# Executar com: sudo bash instalar-wallpaper.sh
# ============================================================================

set -e

# ---------------------------------------------------------------------------
# CONFIGURAÇÃO
# ---------------------------------------------------------------------------
URL_VERSION="https://lucasleniar.com.br/mint/version.txt"
URL_APLICADOR="https://lucasleniar.com.br/mint/wallpaper.sh"

BASE_DIR="/var/local/lucas-wallpaper"
VER_LOCAL="$BASE_DIR/version.txt"
LOG="/var/log/lucas-wallpaper.log"

SCRIPT_CHECK="/usr/local/bin/lucas-wallpaper-check.sh"
SERVICE_FILE="/etc/systemd/system/lucas-wallpaper.service"
TIMER_FILE="/etc/systemd/system/lucas-wallpaper.timer"

# ---------------------------------------------------------------------------
# VERIFICA ROOT
# ---------------------------------------------------------------------------
if [ "$EUID" -ne 0 ]; then
    echo "❌ Execute como root: sudo bash instalar-wallpaper.sh"
    exit 1
fi

echo "▶ Iniciando instalação do sistema de wallpaper..."

# ---------------------------------------------------------------------------
# DIRETÓRIOS
# ---------------------------------------------------------------------------
mkdir -p "$BASE_DIR"
touch "$LOG"
[ -f "$VER_LOCAL" ] || echo "0" > "$VER_LOCAL"

# ---------------------------------------------------------------------------
# SCRIPT DE VERIFICAÇÃO
# ---------------------------------------------------------------------------
cat > "$SCRIPT_CHECK" << 'EOF'
#!/bin/bash
set -e

URL_VERSION="https://lucasleniar.com.br/mint/version.txt"
URL_APLICADOR="https://lucasleniar.com.br/mint/wallpaper.sh"

BASE_DIR="/var/local/lucas-wallpaper"
VER_LOCAL="$BASE_DIR/version.txt"
TMP_VER="/tmp/lucas_wallpaper_ver.txt"
TMP_SCRIPT="/tmp/lucas_wallpaper.sh"
LOG="/var/log/lucas-wallpaper.log"

mkdir -p "$BASE_DIR"
[ -f "$VER_LOCAL" ] || echo "0" > "$VER_LOCAL"

if ! wget -q --timeout=15 --tries=2 -O "$TMP_VER" "$URL_VERSION"; then
    echo "$(date) - Erro ao baixar version.txt" >> "$LOG"
    exit 0
fi

VER_REMOTA=$(tr -d -c '0-9' < "$TMP_VER")
VER_ATUAL=$(tr -d -c '0-9' < "$VER_LOCAL")

[ -z "$VER_REMOTA" ] && VER_REMOTA=0
[ -z "$VER_ATUAL" ] && VER_ATUAL=0

if [ "$VER_REMOTA" -gt "$VER_ATUAL" ]; then
    echo "$(date) - Nova versão detectada: $VER_REMOTA" >> "$LOG"

    if wget -q --timeout=15 --tries=2 -O "$TMP_SCRIPT" "$URL_APLICADOR"; then
        chmod +x "$TMP_SCRIPT"

        if bash "$TMP_SCRIPT"; then
            echo "$VER_REMOTA" > "$VER_LOCAL"
            echo "$(date) - Wallpaper atualizado com sucesso" >> "$LOG"
        else
            echo "$(date) - Erro ao executar wallpaper.sh" >> "$LOG"
        fi
    else
        echo "$(date) - Erro ao baixar wallpaper.sh" >> "$LOG"
    fi
else
    echo "$(date) - Nenhuma atualização (versão $VER_ATUAL)" >> "$LOG"
fi
EOF

chmod +x "$SCRIPT_CHECK"

# ---------------------------------------------------------------------------
# SERVICE
# ---------------------------------------------------------------------------
cat > "$SERVICE_FILE" << 'EOF'
[Unit]
Description=Lucas Wallpaper - Verificação de Atualização
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
ExecStart=/usr/local/bin/lucas-wallpaper-check.sh
User=root
EOF

# ---------------------------------------------------------------------------
# TIMER (10 EM 10 HORAS)
# ---------------------------------------------------------------------------
cat > "$TIMER_FILE" << 'EOF'
[Unit]
Description=Timer de verificação do wallpaper (10h)

[Timer]
OnBootSec=5min
OnUnitActiveSec=10h
Persistent=true

[Install]
WantedBy=timers.target
EOF

# ---------------------------------------------------------------------------
# ATIVAÇÃO
# ---------------------------------------------------------------------------
systemctl daemon-reload
systemctl enable --now lucas-wallpaper.timer

echo "-------------------------------------------------------"
echo "✅ INSTALAÇÃO CONCLUÍDA COM SUCESSO"
echo "⏱️ Verificação automática a cada 10 horas"
echo "📝 Log: /var/log/lucas-wallpaper.log"
echo "-------------------------------------------------------"
