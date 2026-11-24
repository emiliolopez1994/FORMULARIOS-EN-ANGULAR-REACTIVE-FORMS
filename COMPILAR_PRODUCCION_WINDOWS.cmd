@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo CLASE 7 - GENERAR DIST PARA DESPLIEGUE
call npm install
if errorlevel 1 (
  echo ERROR al instalar dependencias.
  pause
  exit /b 1
)
call npm run build
if errorlevel 1 (
  echo ERROR al compilar Angular.
  pause
  exit /b 1
)
echo.
echo COMPILACION FINALIZADA.
echo Los archivos para hosting estan en:
echo dist\clase-7-formularios-angular\browser
pause
