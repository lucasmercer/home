#!/bin/bash

# Desabilitar o Firefox Suggest no Firefox (modo de busca com IA)
echo "Desabilitando Firefox Suggest no Firefox..."
# Modifica o valor de 'browser.urlbar.suggest.engines' para 'false' (sem sugestões)
firefox_config_file="$HOME/.mozilla/firefox/*.default-release/prefs.js"

if [ -f "$firefox_config_file" ]; then
    sed -i 's/browser.urlbar.suggest.engines=true/browser.urlbar.suggest.engines=false/' "$firefox_config_file"
    echo "Configuração do Firefox Suggest alterada."
else
    echo "Arquivo de configuração do Firefox não encontrado!"
fi

# Desabilitar sugestões no Google Chrome
echo "Desabilitando sugestões de pesquisa no Google Chrome..."
chrome_preferences_file="$HOME/.config/google-chrome/Default/Preferences"

if [ -f "$chrome_preferences_file" ]; then
    # Desabilitar a configuração de sugestões de pesquisa
    jq '.profile.content_settings.exceptions["http://www.google.com"] = {"last_modified": 0, "setting": 2}' "$chrome_preferences_file" > temp_preferences.json && mv temp_preferences.json "$chrome_preferences_file"
    echo "Sugestões de pesquisa do Chrome desabilitadas."
else
    echo "Arquivo de preferências do Chrome não encontrado!"
fi

echo "Script executado com sucesso! Algumas configurações podem precisar de reinício dos navegadores para aplicar."
