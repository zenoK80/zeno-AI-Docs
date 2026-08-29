@echo off
chcp 65001 >nul
cd /d %~dp0\..
echo ===== STEP 3 (Claude) =====
node scripts/run.js 3
echo.
pause
