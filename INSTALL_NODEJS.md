# Install Node.js - Quick Guide

## ✅ You have Windows Package Manager (winget)!

This makes installation super easy.

## Option 1: Install via winget (Fastest - 2 minutes)

```powershell
# Install Node.js LTS
winget install OpenJS.NodeJS.LTS

# Restart your terminal/PowerShell
# Then verify:
node --version
npm --version
```

## Option 2: Manual Download (5 minutes)

1. Go to: https://nodejs.org/en/download/
2. Click "Windows Installer (.msi)" - LTS version
3. Run the installer
4. Click "Next" through all steps
5. Restart terminal
6. Verify: `node --version`

## After Installation

```powershell
# Navigate to project
cd "c:\Users\Forrest Pan\CascadeProjects\adaptive-creative"

# Install dependencies
npm install

# Run the app
npm run dev
```

Open http://localhost:3000 - you should see the app! 🎉

## Next Steps

1. ✅ Install Node.js (you're doing this now)
2. ✅ Run `npm install`
3. ✅ Run `npm run dev`
4. ✅ Test the demo flow
5. ✅ Deploy to Vercel
6. ✅ Submit to DevPost

See `START_HERE.md` for the complete guide!
