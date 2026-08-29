@echo off
chcp 65001 >nul
cd /d %~dp0\..
echo ===== STEP 2 (Perplexity) =====
node scripts/run.js 2
echo.
pause
