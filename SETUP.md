# Setup Instructions

## Prerequisites

You need to install Node.js first:

1. **Download Node.js**: https://nodejs.org/en/download/
   - Download the Windows Installer (.msi)
   - Choose LTS version (recommended)
   - Run the installer and follow the prompts

2. **Verify Installation**:
   ```bash
   node --version
   npm --version
   ```

## Installation Steps

Once Node.js is installed:

```bash
# Navigate to project directory
cd "C:\Users\Forrest Pan\CascadeProjects\adaptive-creative"

# Install dependencies
npm install

# Set up environment variables
# Edit .env.local and add your API keys:
# - TWELVELABS_API_KEY
# - ELEVENLABS_API_KEY
# - AWS_ACCESS_KEY_ID
# - AWS_SECRET_ACCESS_KEY

# Run development server
npm run dev
```

Open http://localhost:3000 in your browser.

## API Keys Needed

### 1. TwelveLabs (Required)
- Sign up: https://api.twelvelabs.io/
- Free tier: 10 hours of video/month
- Get API key from dashboard
- Create an index and note the INDEX_ID

### 2. ElevenLabs (Required)
- Sign up: https://elevenlabs.io/
- Free tier: 10,000 characters/month
- Get API key from profile settings

### 3. AWS Bedrock (Optional for demo)
- Sign up: https://aws.amazon.com/bedrock/
- Create IAM user with Bedrock access
- Get access key and secret key

### 4. Swayable (Check Discord)
- Ask in hackathon Discord for API access
- May have special hackathon credentials

## Quick Start (Without API Keys)

The app works with demo/mock data if API keys aren't configured.
Just run `npm run dev` and click "Use Demo Video" to see it in action.

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Dependencies not installing?**
```bash
npm cache clean --force
npm install
```

**Build errors?**
```bash
rm -rf .next
npm run dev
```
