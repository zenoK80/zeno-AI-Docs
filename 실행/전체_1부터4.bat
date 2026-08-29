@echo off
chcp 65001 >nul
cd /d %~dp0\..
echo ===== STEPS 1-4 =====
node scripts/run.js 1-4
echo.
pause
