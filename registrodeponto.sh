#!/bin/bash

chmod +x ./registrodeponto.sh

ARQLOG="/var/log/.log-mudanca-pagina-inicial.log"
echo "Log: iniciou criação do atalho Registro de Ponto em $(date +%d/%m/%Y_%H:%M:%S_%N)" >> "$ARQLOG"

if [ "$(whoami)" != "root" ]; then
   echo " !! Precisa executar como super-usuário !!"
   exit 1
fi

# === ÍCONE PERSONALIZADO ===
iconeRegistro="/usr/share/icons/iconepontolucas.jpeg"
wget -q -O "$iconeRegistro" "https://lucasleniar.com.br/registropontolucas.jpeg"
chmod ugo+rx "$iconeRegistro" 2>> /dev/null

# === SCRIPT PARA ABRIR O SITE ===
scriptRegistroPonto="/usr/local/bin/abrirsitepontoseed.sh"
cat > "$scriptRegistroPonto" << EndOfThisFile
#!/bin/bash
site="www.registropontoseed.pr.gov.br"
if [ "\$1" = "" ]; then
    /usr/bin/google-chrome-stable --password-store=basic -start-maximized \$site < /dev/null &> /dev/null & disown
else
    /usr/bin/google-chrome-stable --password-store=basic -start-maximized --incognito \$site < /dev/null &> /dev/null & disown
fi
EndOfThisFile
chmod +x "$scriptRegistroPonto"

# === MODELO DO ATALHO ===
atalhoPonto="/tmp/.modelopontoseed.desktop"
cat > "$atalhoPonto" << EndOfThisFile
[Desktop Entry]
Version=1.0
Name=Registro de Ponto SEED
GenericName=Registro de Ponto SEED
GenericName[pt]=Registro de Ponto SEED
GenericName[pt_BR]=Registro de Ponto SEED
Comment=Registro de Ponto SEED
Comment[pt_BR]=Registro de Ponto SEED
Exec=$scriptRegistroPonto
StartupNotify=true
Terminal=false
Icon=$iconeRegistro
Type=Application
Categories=Network;WebBrowser;
MimeType=application/pdf;application/xhtml+xml;text/html;x-scheme-handler/http;x-scheme-handler/https;
Actions=new-window;new-private-window;
EndOfThisFile

# === CRIAR PARA TODOS USUÁRIOS ===
cd /home
for usuario in * ; do
   if [[ "$usuario" = *"lost"* ]]; then
       continue
   fi
   cd "/home/$usuario"
   if [[ ! -e "Área de Trabalho" ]]; then
       echo "sem área de trabalho $usuario" >> "$ARQLOG"
       continue
   fi
   cp "$atalhoPonto" "/home/${usuario}/Área de Trabalho/registrodeponto.desktop"
   chown "$usuario":"$usuario" "/home/${usuario}/Área de Trabalho/registrodeponto.desktop" 2>> /dev/null
   chmod +x "/home/${usuario}/Área de Trabalho/registrodeponto.desktop"
   echo "Criado atalho Registro de Ponto para $usuario" >> "$ARQLOG"
done

# === COPIAR PARA /etc/skel ===
if [[ -e "/etc/skel/Área de Trabalho" ]]; then
   cp "$atalhoPonto" "/etc/skel/Área de Trabalho/registrodeponto.desktop"
   chmod +x "/etc/skel/Área de Trabalho/registrodeponto.desktop"
   echo "copiado para skel" >> "$ARQLOG"
else
   echo "sem área de trabalho no skel" >> "$ARQLOG"
fi

# === PARA USUÁRIOS GUEST ===
cd /tmp
for usuario in guest*; do
   cd /tmp
   if [[ "$usuario" = *"lost"* ]]; then
       continue
   fi
   if [ ! -e "$usuario" ]; then
       continue
   fi
   cd "$usuario"
   if [[ ! -e "Área de Trabalho" ]]; then
       echo "sem área de trabalho $usuario (guest)" >> "$ARQLOG"
       continue
   fi
   cp "$atalhoPonto" "/tmp/${usuario}/Área de Trabalho/registrodeponto.desktop"
   chown "$usuario":"$usuario" "/tmp/${usuario}/Área de Trabalho/registrodeponto.desktop"
   chmod +x "/tmp/${usuario}/Área de Trabalho/registrodeponto.desktop"
   echo "Criado atalho Registro de Ponto para $usuario (guest)" >> "$ARQLOG"
done

echo "Log: fim da execução em $(date +%d/%m/%Y_%H:%M:%S_%N)" >> "$ARQLOG"
echo "Script concluído. Verifique o log em $ARQLOG"
