@echo off
netstat -ano | findstr 127.0.0.1:3000 >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo Port 3000 already listening.
    exit /b 0
)
netstat -ano | findstr :3000 | findstr LISTENING >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo Port 3000 already listening.
    exit /b 0
)

cd /d "D:\Ren\Project Web\invitation-app"
npm run dev > "D:\Ren\Project Web\invitation-app\nextjs-dev.log" 2>&1
