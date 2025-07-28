#!/bin/bash
if ! command -v pactl &> /dev/null; then
    echo "pactl não encontrado. Instale o pacote pulseaudio-utils."
    exit 1
fi

echo "Ajustando volume do microfone para 23%..."
MIC_ID=$(pactl list sources short | grep input | awk '{print $1}')
for id in $MIC_ID; do
    pactl set-source-volume $id 23%
    pactl set-source-mute $id 0
    echo "Microfone ID $id ajustado."
done

LOCK_SCRIPT="/etc/pulse/mic-lock.sh"

echo "Criando script de travamento em: $LOCK_SCRIPT"
cat <<EOF | sudo tee $LOCK_SCRIPT > /dev/null
#!/bin/bash
# Hook de travamento de volume do microfone (Lucas Leniar)
for id in \$(pactl list sources short | grep input | awk '{print \$1}'); do
    pactl set-source-volume \$id 23%
    pactl set-source-mute \$id 0
done
EOF

chmod +x "$LOCK_SCRIPT"

if ! grep -q "mic-lock.sh" /etc/crontab; then
    echo "* * * * * root $LOCK_SCRIPT" | sudo tee -a /etc/crontab > /dev/null
    echo "Bloqueio periódico configurado via crontab (/etc/crontab)."
else
    echo "Crontab já estava configurado para o script."
fi

echo ""
echo "Microfone ajustado e bloqueado em 23% com sucesso."
echo "Script criado por Lucas Leniar — lucas.leniar@escola.pr.gov.br"
echo ""
