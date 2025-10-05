# Quick Fix - Node.js PATH Issue

## ✅ Node.js is installed, but PATH needs updating

### Solution 1: Restart Terminal (Easiest)

1. **Close this terminal/PowerShell window completely**
2. **Open a NEW terminal/PowerShell window**
3. Run:
   ```powershell
   node --version  # Should work now
   npm --version
   ```
4. Then:
   ```powershell
   cd "c:\Users\Forrest Pan\CascadeProjects\adaptive-creative"
   npm install
   npm run dev
   ```

### Solution 2: Use Helper Script (No restart needed)

```powershell
# Run this from the project directory:
.\run-dev.ps1
```

This script sets the PATH and runs the dev server automatically.

### Solution 3: Manual PATH Update (Advanced)

```powershell
# Add Node.js to current session PATH
$env:Path = "C:\Program Files\nodejs;" + $env:Path

# Verify
node --version
npm --version

# Then install and run
npm install
npm run dev
```

## After It Works

1. ✅ Open http://localhost:3000
2. ✅ Click "Use Demo Video"
3. ✅ Test the complete flow
4. ✅ Deploy to Vercel
5. ✅ Submit to DevPost

## Still Having Issues?

### Option A: Use the helper script
```powershell
.\run-dev.ps1
```

### Option B: Restart your IDE
- Close VS Code / your IDE completely
- Reopen it
- Open new terminal
- Try `node --version` again

### Option C: System Restart
- Restart Windows (ensures PATH is updated)
- Open new terminal
- Run `node --version`

## Next Steps

Once `node --version` works:

```powershell
cd "c:\Users\Forrest Pan\CascadeProjects\adaptive-creative"
npm install
npm run dev
```

Then follow `START_HERE.md` for deployment and submission!
