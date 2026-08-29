@echo off
chcp 65001 >nul
cd /d %~dp0\..
echo ===== ALL STEPS 1-5 =====
node scripts/run.js 1-5
echo.
pause
