# Deployment Guide

## Deploy to Vercel (Recommended)

Vercel is the fastest way to deploy Next.js apps and is **free for hobby projects**.

### Method 1: Deploy via GitHub (Easiest)

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AdaptiveCreative hackathon project"
   git branch -M main
   git remote add origin https://github.com/yourusername/adaptive-creative.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Add Environment Variables** (Optional)
   - Go to Project Settings → Environment Variables
   - Add your API keys:
     - `TWELVELABS_API_KEY`
     - `TWELVELABS_INDEX_ID`
     - `ELEVENLABS_API_KEY`
     - `ELEVENLABS_VOICE_ID`
     - `SWAYABLE_API_KEY`

4. **Get Your Live URL**
   - Vercel provides: `https://adaptive-creative.vercel.app`
   - Add this to your DevPost submission!

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Alternative Deployment Options

### Netlify

1. Push to GitHub
2. Go to https://netlify.com
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Click "Deploy"

### AWS Amplify

1. Push to GitHub
2. Go to AWS Amplify Console
3. Click "New app" → "Host web app"
4. Connect GitHub repository
5. Build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

### Docker (Self-hosted)

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t adaptive-creative .
docker run -p 3000:3000 adaptive-creative
```

## Environment Variables for Production

Add these to your deployment platform:

```bash
# Required for real API integration
TWELVELABS_API_KEY=your_key_here
TWELVELABS_INDEX_ID=your_index_id_here
ELEVENLABS_API_KEY=your_key_here
ELEVENLABS_VOICE_ID=your_voice_id_here

# Optional
SWAYABLE_API_KEY=your_key_here
AWS_ACCESS_KEY_ID=your_key_here
AWS_SECRET_ACCESS_KEY=your_key_here
AWS_REGION=us-east-1
```

**Note**: The app works perfectly without these! It will use mock data for demo purposes.

## Post-Deployment Checklist

- [ ] Test the live URL
- [ ] Verify "Use Demo Video" button works
- [ ] Test variant generation flow
- [ ] Check all pages load correctly
- [ ] Take screenshots for DevPost
- [ ] Record demo video showing the live site
- [ ] Add live URL to DevPost submission
- [ ] Add live URL to README.md

## Performance Optimization

### Enable Edge Functions (Vercel)

In `next.config.mjs`:
```javascript
export const runtime = 'edge';
```

### Enable Image Optimization

Already configured in Next.js 14!

### Enable Caching

API routes automatically cache responses when possible.

## Monitoring

### Vercel Analytics

Enable in Project Settings → Analytics (free tier available)

### Error Tracking

Add Sentry for production error tracking:
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

## Custom Domain (Optional)

1. Buy domain from Namecheap, GoDaddy, etc.
2. In Vercel: Settings → Domains
3. Add your domain
4. Update DNS records as instructed
5. SSL certificate auto-provisioned

## Troubleshooting Deployment

### Build fails with TypeScript errors
- Run `npm run build` locally first
- Fix any type errors
- Commit and redeploy

### API routes return 500 errors
- Check environment variables are set
- Check Vercel function logs
- Ensure API keys are valid

### Slow cold starts
- Use Vercel Edge Functions
- Enable caching
- Optimize bundle size

## Quick Deploy Commands

```bash
# Deploy to Vercel (production)
vercel --prod

# Deploy preview (staging)
vercel

# Check deployment status
vercel ls

# View logs
vercel logs
```

## Success Checklist

✅ App deployed and accessible  
✅ Demo flow works end-to-end  
✅ Screenshots captured  
✅ Demo video recorded  
✅ Live URL added to DevPost  
✅ GitHub repo is public  
✅ README has live demo link  

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Vercel Discord: https://vercel.com/discord
