@echo off
echo Instalando Wallpaper Changer...

set pasta=%LOCALAPPDATA%\WallpaperChanger
set script=%pasta%\wallpaper.ps1

REM Criar pasta
if not exist "%pasta%" mkdir "%pasta%"

echo Criando script PowerShell...

powershell -Command ^
"$conteudo = @'
# --- CONFIGURACOES ---
$urlWallpaper = \"https://lucasleniar.com.br/mint/wallpaper.jpg\"
$urlVersao    = \"https://lucasleniar.com.br/mint/version.txt\"

$pastaAppData  = \"$env:LOCALAPPDATA\WallpaperChanger\"
$arquivoLocalImagem  = \"$pastaAppData\wallpaper.jpg\"
$arquivoLocalVersao  = \"$pastaAppData\version.txt\"

try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

    $wc = New-Object System.Net.WebClient
    $versaoWeb = $wc.DownloadString($urlVersao).Trim()

    $versaoLocal = 0
    if (Test-Path $arquivoLocalVersao) {
        $versaoLocal = (Get-Content $arquivoLocalVersao).Trim()
    }

    if ([long]$versaoWeb -gt [long]$versaoLocal) {

        $wc.DownloadFile($urlWallpaper, $arquivoLocalImagem)
        $versaoWeb | Out-File -FilePath $arquivoLocalVersao -Encoding utf8

        $code = @\"
using System.Runtime.InteropServices;
public class Wallpaper {
    [DllImport(\"user32.dll\", CharSet = CharSet.Auto)]
    public static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);
}
\"@

        Add-Type -TypeDefinition $code -ErrorAction SilentlyContinue
        [Wallpaper]::SystemParametersInfo(0x0014, 0, $arquivoLocalImagem, 0x01 -bor 0x02)
    }

} catch {}
'@

Set-Content -Path '%script%' -Value $conteudo -Encoding UTF8
"

echo Criando tarefa agendada...

schtasks /create /tn "WallpaperUpdater" /tr "powershell -WindowStyle Hidden -ExecutionPolicy Bypass -File \"%script%\"" /sc onlogon /rl highest /f

echo.
echo Instalacao concluida!
pause
