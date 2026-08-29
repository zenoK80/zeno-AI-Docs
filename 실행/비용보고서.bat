@echo off
chcp 65001 >nul
cd /d %~dp0\..
node scripts/cost-report.js
echo.
pause
