@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0..\resell"
call npm run dev
