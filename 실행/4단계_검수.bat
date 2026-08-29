@echo off
chcp 65001 >nul
cd /d %~dp0\..
echo ===== STEP 4 (Gemini) =====
node scripts/run.js 4
echo.
pause
