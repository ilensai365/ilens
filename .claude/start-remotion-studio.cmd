@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0..\remotion"
call npx remotion studio src/index.ts --port=%PORT% --no-open
