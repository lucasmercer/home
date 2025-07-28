#!/bin/bash

ATALHO="$HOME/Área de Trabalho/Pesquisa entre alunos.desktop"

cat <<EOF > "$ATALHO"
[Desktop Entry]
Name=Pesquisa entre alunos
Comment=Abrir formulário de pesquisa entre alunos
Exec=xdg-open "https://script.google.com/macros/s/AKfycbxLfUmJXJ40TAyc7tXDa0j0sIZdzWDyRIx1hqyGnDZD8SkoydesVT-547A0CVRjRrs/exec"
Icon=accessories-text-editor
Terminal=false
Type=Application
Categories=Network;
EOF

chmod +x "$ATALHO"

echo "Atalho criado com sucesso em: $ATALHO"
echo "Criado por Lucas Leniar | lucas.leniar@escola.pr.gov.br"
