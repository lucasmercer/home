#!/bin/bash

# Configurações
NAME="Registro de Frequência SEED"
URL="https://registrofrequenciaseed.paas.pr.gov.br/"
ICON_URL="https://img.freepik.com/vetores-premium/presenca-da-maquina_1115605-24.jpg"
ICON_PATH="/usr/share/pixmaps/ponto_seed.jpg"
FILE_NAME="ponto_seed.desktop"

# Simula um navegador real para evitar que o Freepik bloqueie o download
USER_AGENT="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Garante que o diretório base para o ícone exista
sudo mkdir -p /usr/share/pixmaps/

# Baixa o ícone com User-Agent
if command -v curl &> /dev/null; then
    sudo curl -A "$USER_AGENT" -L -s -o "$ICON_PATH" "$ICON_URL"
elif command -v wget &> /dev/null; then
    sudo wget -U "$USER_AGENT" -q -O "$ICON_PATH" "$ICON_URL"
else
    echo "Erro: curl ou wget não encontrados."
    exit 1
fi

# Valida se o arquivo baixado é realmente uma imagem (evita exibir erro 403 em HTML)
if ! file "$ICON_PATH" | grep -qiE "image|jpeg|png|bitmap"; then
    echo "Aviso: O download do ícone falhou ou foi bloqueado pelo servidor. Usando ícone padrão de fallback."
    # Se falhar, usa um ícone padrão do sistema (navegador) para não ficar com ícone de texto
    ICON_PATH="web-browser"
else
    # Garante que todos os usuários possam ler a imagem do ícone
    sudo chmod 644 "$ICON_PATH"
fi

create_desktop_file() {
cat <<EOF
[Desktop Entry]
Version=1.0
Type=Application
Terminal=false
Name=$NAME
Comment=Acesso ao Registro de Frequência SEED
Exec=xdg-open "$URL"
Icon=$ICON_PATH
Categories=Network;WebBrowser;
StartupNotify=true
EOF
}

# Configuração para novos usuários (/etc/skel)
sudo mkdir -p /etc/skel/Desktop
create_desktop_file | sudo tee "/etc/skel/Desktop/$FILE_NAME" > /dev/null
sudo chmod +x "/etc/skel/Desktop/$FILE_NAME"

# Distribui o atalho para as contas de usuário existentes
for user_dir in /home/*; do
  [ -d "$user_dir" ] || continue
  USER_NAME=$(basename "$user_dir")
  
  if [ -f "$user_dir/.config/user-dirs.dirs" ]; then
    DESKTOP_DIR=$(grep "XDG_DESKTOP_DIR" "$user_dir/.config/user-dirs.dirs" | cut -d'"' -f2 | sed "s|\$HOME|$user_dir|")
  else
    DESKTOP_DIR="$user_dir/Desktop"
  fi

  if [ -d "$DESKTOP_DIR" ]; then
    DEST="$DESKTOP_DIR/$FILE_NAME"
    create_desktop_file | sudo tee "$DEST" > /dev/null
    sudo chown "$USER_NAME:$USER_NAME" "$DEST"
    sudo chmod +x "$DEST"
    
    # Injeção robusta da sessão do D-Bus para o GIO no Cinnamon
    USER_UID=$(id -u "$USER_NAME")
    
    # Busca o PID com a flag -f para burlar o limite de 15 caracteres no cinnamon-session
    DBUS_PID=$(pgrep -u "$USER_UID" -n systemd || pgrep -f -u "$USER_UID" -n "cinnamon-session")
    
    if [ -n "$DBUS_PID" ]; then
        DBUS_ADDR=$(sudo grep -z DBUS_SESSION_BUS_ADDRESS "/proc/$DBUS_PID/environ" 2>/dev/null | tr -d '\0' | sed 's/DBUS_SESSION_BUS_ADDRESS=//')
    else
        DBUS_ADDR="unix:path=/run/user/$USER_UID/bus"
    fi
    
    # Marca o arquivo como confiável no Nemo
    if [ -n "$DBUS_ADDR" ]; then
        sudo -u "$USER_NAME" env DBUS_SESSION_BUS_ADDRESS="$DBUS_ADDR" gio set "$DEST" metadata::trusted true 2>/dev/null
        sudo -u "$USER_NAME" env DBUS_SESSION_BUS_ADDRESS="$DBUS_ADDR" gio set "$DEST" metadata::trusted yes 2>/dev/null
    fi
  fi
done

# Atualiza o banco de dados de atalhos da interface gráfica
sudo update-desktop-database 2>/dev/null

echo "Script executado! Atalho criado e verificado."
