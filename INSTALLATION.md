# Installation Guide

## Prerequisites

### 1. Install Node.js

Download and install Node.js 18+ from: https://nodejs.org/

**Recommended**: Use the LTS (Long Term Support) version.

After installation, verify:
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

### 2. Install Dependencies

```bash
cd c:\Users\Forrest Pan\CascadeProjects\adaptive-creative
npm install
```

This will install all required packages from `package.json`.

### 3. Configure Environment Variables (Optional)

```bash
# Copy the example file
copy .env.example .env.local

# Edit .env.local and add your API keys
notepad .env.local
```

**Note**: The app works perfectly without API keys using mock data!

## Running the Application

### Development Mode

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Production Build

```bash
npm run build
npm start
```

## Troubleshooting

### Issue: "npm is not recognized"
**Solution**: Node.js is not installed or not in PATH. Install from https://nodejs.org/

### Issue: Port 3000 already in use
**Solution**: 
```bash
# Use a different port
$env:PORT=3001; npm run dev
```

### Issue: Module not found errors
**Solution**: 
```bash
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue: TypeScript errors
**Solution**: These are expected during development. Run:
```bash
npm run build
```
If build succeeds, the app is working correctly.

## Next Steps

1. ✅ Install Node.js
2. ✅ Run `npm install`
3. ✅ Run `npm run dev`
4. ✅ Open http://localhost:3000
5. ✅ Click "Use Demo Video" to test the flow
6. ✅ Select markets and generate variants

## API Integration (Optional)

To use real APIs instead of mock data:

### TwelveLabs
1. Sign up at https://twelvelabs.io
2. Get API key from dashboard
3. Create an index
4. Add to `.env.local`:
   ```
   TWELVELABS_API_KEY=your_key
   TWELVELABS_INDEX_ID=your_index_id
   ```

### ElevenLabs
1. Sign up at https://elevenlabs.io
2. Get API key
3. Clone or select a voice
4. Add to `.env.local`:
   ```
   ELEVENLABS_API_KEY=your_key
   ELEVENLABS_VOICE_ID=your_voice_id
   ```

### Swayable (Optional)
1. Contact Swayable for API access
2. Add to `.env.local`:
   ```
   SWAYABLE_API_KEY=your_key
   ```

## Demo Mode

The app is designed to work **perfectly without any API keys**:
- Video upload shows demo flow
- Analysis uses realistic mock data
- Variant generation simulates real processing
- All UI features are fully functional

This makes it ideal for:
- Hackathon presentations
- Quick demos
- Testing the user experience
- Showcasing the concept

## Support

For issues or questions:
1. Check this guide
2. Review README.md
3. Check the DevPost submission
