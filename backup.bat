@echo off

set CONTAINER=mysql_db
set DB_USER=root
set DB_PASS=1234
set DB_NAME=art_gallery
set BACKUP_DIR=%~dp0backups


if not exist "%BACKUP_DIR%" (
    mkdir "%BACKUP_DIR%"
)


for /f %%i in ('powershell -Command "Get-Date -Format yyyy-MM-dd_HH-mm"') do set DATETIME=%%i


docker exec %CONTAINER% sh -c "mysqldump -u%DB_USER% -p%DB_PASS% %DB_NAME%" > "%BACKUP_DIR%\backup_%DATETIME%.sql"

echo Backup complet în: %BACKUP_DIR%\backup_%DATETIME%.sql
