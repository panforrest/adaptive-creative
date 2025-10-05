# GitHub Setup & Push Guide

## Step 1: Configure Git (One-time setup)

Run these commands with YOUR information:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Example:**
```bash
git config --global user.name "Forrest Pan"
git config --global user.email "forrest@example.com"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `adaptive-creative`
3. Description: `AI-powered multi-market ad localization platform - Advertising Week NYC 2025 Hackathon`
4. **Keep it PUBLIC** (required for hackathon)
5. **DO NOT** initialize with README (we already have one)
6. Click **"Create repository"**

## Step 3: Push to GitHub

After creating the repo, GitHub will show you commands. Use these:

```bash
# The files are already added and ready to commit
# Just need to commit with your identity set

git commit -m "Initial commit - AdaptiveCreative hackathon project"

# Add your GitHub repo as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/adaptive-creative.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 4: Verify on GitHub

1. Go to your repo: `https://github.com/YOUR_USERNAME/adaptive-creative`
2. You should see all files
3. README.md should display on the homepage
4. Copy the repo URL for DevPost submission

## Quick Commands (After Git Config)

```bash
# If you're in the project directory:
cd "c:\Users\Forrest Pan\CascadeProjects\adaptive-creative"

# Commit
git commit -m "Initial commit - AdaptiveCreative hackathon project"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/adaptive-creative.git

# Push
git branch -M main
git push -u origin main
```

## Troubleshooting

### If you get authentication error:
- GitHub removed password authentication
- Use **Personal Access Token** instead:
  1. Go to https://github.com/settings/tokens
  2. Click "Generate new token (classic)"
  3. Select scopes: `repo` (all)
  4. Copy the token
  5. Use token as password when pushing

### If remote already exists:
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/adaptive-creative.git
```

### If you need to update files:
```bash
git add .
git commit -m "Update: description of changes"
git push
```

## What Gets Pushed

✅ All source code
✅ All documentation
✅ Package.json (dependencies)
✅ Configuration files
❌ node_modules (excluded by .gitignore)
❌ .env.local (excluded by .gitignore)

## After Pushing

1. ✅ Copy GitHub repo URL
2. ✅ Add to DevPost submission
3. ✅ Ensure repo is PUBLIC
4. ✅ Verify README displays correctly

## Next: Deploy to Vercel

Once pushed to GitHub:
1. Go to https://vercel.com
2. Click "New Project"
3. Import from GitHub
4. Select `adaptive-creative` repo
5. Click "Deploy"
6. Copy live URL for DevPost

---

**Your GitHub repo URL will be:**
`https://github.com/YOUR_USERNAME/adaptive-creative`

**Replace YOUR_USERNAME with your actual GitHub username!**
