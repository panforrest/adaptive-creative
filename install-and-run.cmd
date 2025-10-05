@echo off
echo ========================================
echo AdaptiveCreative - Setup and Run
echo ========================================
echo.

set PATH=C:\Program Files\nodejs;%PATH%

echo Checking Node.js installation...
node --version
npm --version
echo.

echo Installing dependencies...
npm install
echo.

echo Starting development server...
echo Open http://localhost:3000 in your browser
echo.
npm run dev
