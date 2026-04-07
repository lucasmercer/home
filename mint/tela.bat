@echo off
echo Instalando Wallpaper Changer...

REM Criar pasta
set pasta=%LOCALAPPDATA%\WallpaperChanger
if not exist "%pasta%" mkdir "%pasta%"

REM Criar script PowerShell
set script=%pasta%\wallpaper.ps1

echo Criando script...

(
echo # Script de atualização de wallpaper
echo $urlWallpaper = "https://lucasleniar.com.br/mint/wallpaper.jpg"
echo $urlVersao    = "https://lucasleniar.com.br/mint/version.txt"
echo $pastaAppData  = "$env:LOCALAPPDATA\WallpaperChanger"
echo $arquivoLocalImagem  = "$pastaAppData\wallpaper.jpg"
echo $arquivoLocalVersao  = "$pastaAppData\version.txt"
echo try {
echo     $versaoWeb = (Invoke-WebRequest -Uri $urlVersao -UseBasicParsing).Content.Trim()
echo     $versaoLocal = 0
echo     if (Test-Path $arquivoLocalVersao) {
echo         $versaoLocal = (Get-Content $arquivoLocalVersao).Trim()
echo     }
echo     if ([long]$versaoWeb -gt [long]$versaoLocal) {
echo         Invoke-WebRequest -Uri $urlWallpaper -OutFile $arquivoLocalImagem
echo         $versaoWeb ^| Out-File -FilePath $arquivoLocalVersao -Encoding utf8
echo         $code = @"
echo using System.Runtime.InteropServices;
echo public class Wallpaper {
echo     [DllImport("user32.dll", CharSet = CharSet.Auto)]
echo     public static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);
echo }
echo "@
echo         Add-Type -TypeDefinition $code -ErrorAction SilentlyContinue
echo         [Wallpaper]::SystemParametersInfo(0x0014, 0, $arquivoLocalImagem, 0x01 -bor 0x02)
echo     }
echo } catch {}
) > "%script%"

REM Criar tarefa agendada
echo Criando tarefa automatica...

schtasks /create /tn "WallpaperUpdater" /tr "powershell -ExecutionPolicy Bypass -File \"%script%\"" /sc onlogon /rl highest /f

echo.
echo Instalacao concluida!
pause
