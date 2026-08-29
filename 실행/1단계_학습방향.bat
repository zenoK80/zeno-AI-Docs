@echo off
chcp 65001 >nul
cd /d %~dp0\..
echo ===== STEP 1 (Grok) =====
node scripts/run.js 1
echo.
pause
