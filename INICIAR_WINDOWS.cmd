@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo CLASE 7 - FORMULARIOS ANGULAR
echo ==============================
where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: No se encontro npm. Instala Node.js y reinicia la terminal.
  pause
  exit /b 1
)
if not exist "node_modules" (
  echo Instalando dependencias por primera vez...
  call npm install
  if errorlevel 1 (
    echo ERROR: No se pudieron instalar las dependencias.
    pause
    exit /b 1
  )
)
echo Abriendo Angular en http://localhost:4200 ...
call npm start
if errorlevel 1 pause
