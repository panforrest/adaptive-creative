# Helper script to run the dev server with full Node.js path

$env:Path = "C:\Program Files\nodejs;" + $env:Path

Write-Host "Starting AdaptiveCreative development server..." -ForegroundColor Green
Write-Host "Node.js version:" -ForegroundColor Cyan
& "C:\Program Files\nodejs\node.exe" --version
Write-Host ""

Write-Host "Installing dependencies..." -ForegroundColor Cyan
& "C:\Program Files\nodejs\npm.cmd" install

Write-Host ""
Write-Host "Starting dev server..." -ForegroundColor Cyan
Write-Host "Open http://localhost:3000 in your browser" -ForegroundColor Yellow
Write-Host ""

& "C:\Program Files\nodejs\npm.cmd" run dev
