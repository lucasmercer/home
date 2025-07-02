#!/bin/bash

# Verifica se o script está sendo executado com permissões de root
if [ "$(id -u)" -ne 0 ]; then
  echo "Este script precisa ser executado com permissões de root. Por favor, use 'sudo'."
  exit 1
fi

# Define a URL da nova imagem de fundo
WALLPAPER_URL="http://www.lucasleniar.com.br/wallpaper.jpg"

# Define os caminhos completos para os arquivos a serem substituídos
DEST_PATH_LINUXMINT_DEFAULT="/usr/share/backgrounds/linuxmint/default_background.jpg"
DEST_PATH_LINUXMINT_LMMINT="/usr/share/backgrounds/linuxmint/linuxmint.jpg"

DEST_PATH_XFCE_BACKDROPS_DEFAULT="/usr/share/xfce4/backdrops/default_background.jpg"
DEST_PATH_XFCE_BACKDROPS_LMMINT="/usr/share/xfce4/backdrops/linuxmint.jpg"

echo "Baixando a nova imagem de plano de fundo..."
# Baixa a imagem e a salva temporariamente
if ! wget -O /tmp/wallpaper.jpg "$WALLPAPER_URL"; then
  echo "Erro ao baixar a imagem. Verifique a URL ou sua conexão com a internet."
  exit 1
fi

# Função para Processar a Substituição de Imagens
process_wallpaper_file() {
  local target_path="$1"
  local source_path="$2" # Caminho de onde a nova imagem será copiada

  echo "Processando: $target_path"

  if [ -f "$target_path" ]; then
    echo "Fazendo backup de '$target_path'..."
    mv "$target_path" "${target_path}.bak"
  else
    echo "O arquivo original '$target_path' não foi encontrado, nenhum backup será criado."
  fi

  echo "Copiando nova imagem para '$target_path'..."
  cp "$source_path" "$target_path"

  echo "Definindo permissões para '$target_path'..."
  chmod 644 "$target_path"
  chown root:root "$target_path"
}

# Executando a Substituição
echo "--- Iniciando o processo de substituição de planos de fundo ---"

# Move a imagem baixada para o primeiro local, para servir de fonte para os outros
echo "Movendo a imagem baixada para '$DEST_PATH_LINUXMINT_DEFAULT'..."
if [ -f "$DEST_PATH_LINUXMINT_DEFAULT" ]; then
  mv "$DEST_PATH_LINUXMINT_DEFAULT" "${DEST_PATH_LINUXMINT_DEFAULT}.bak"
else
  echo "O arquivo original '$DEST_PATH_LINUXMINT_DEFAULT' não foi encontrado, nenhum backup será criado."
fi
mv /tmp/wallpaper.jpg "$DEST_PATH_LINUXMINT_DEFAULT"
chmod 644 "$DEST_PATH_LINUXMINT_DEFAULT"
chown root:root "$DEST_PATH_LINUXMINT_DEFAULT"

# Agora, use a imagem recém-movida como fonte para todas as outras cópias
SOURCE_FOR_COPIES="$DEST_PATH_LINUXMINT_DEFAULT"

process_wallpaper_file "$DEST_PATH_LINUXMINT_LMMINT" "$SOURCE_FOR_COPIES"
process_wallpaper_file "$DEST_PATH_XFCE_BACKDROPS_DEFAULT" "$SOURCE_FOR_COPIES"
process_wallpaper_file "$DEST_PATH_XFCE_BACKDROPS_LMMINT" "$SOURCE_FOR_COPIES"

echo "--- Concluído ---"
echo "Todos os planos de fundo especificados foram alterados com sucesso."
echo "Para que as alterações tenham efeito, pode ser necessário reiniciar as sessões dos usuários ou o sistema."
