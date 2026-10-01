@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0..\site-v2"
call npm run dev
