@echo off
chcp 65001 >nul
cd /d %~dp0\..
echo ===== STEPS 1-3 =====
node scripts/run.js 1-3
echo.
pause
