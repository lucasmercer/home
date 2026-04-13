#!/bin/bash

# Configurações
NAME="Registro de Ponto SEED"
URL="https://registropontoseed.pr.gov.br/"
ICON_URL="https://img.freepik.com/vetores-premium/presenca-da-maquina_1115605-24.jpg"
ICON_PATH="/usr/share/pixmaps/ponto_seed.jpg"
FILE_NAME="ponto_seed.desktop"

sudo curl -L -s -o "$ICON_PATH" "$ICON_URL"

create_desktop_file() {
    cat <<EOF
[Desktop Entry]
Version=1.0
Type=Application
Terminal=false
Name=$NAME
Comment=Acesso ao Registro de Ponto SEED
Exec=python3 -m webbrowser "$URL"
Icon=$ICON_PATH
Categories=Network;WebBrowser;
StartupNotify=true
EOF
}

sudo mkdir -p /etc/skel/Desktop
create_desktop_file | sudo tee "/etc/skel/Desktop/$FILE_NAME" > /dev/null
sudo chmod +x "/etc/skel/Desktop/$FILE_NAME"

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
        
        sudo -u "$USER_NAME" gio set "$DEST" metadata::trusted true 2>/dev/null
    fi
done

echo "Script executado! Tente abrir o ícone agora."
