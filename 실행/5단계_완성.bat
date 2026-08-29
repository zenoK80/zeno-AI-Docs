@echo off
chcp 65001 >nul
cd /d %~dp0\..
echo ===== STEP 5 (GPT) =====
node scripts/run.js 5
echo.
pause
