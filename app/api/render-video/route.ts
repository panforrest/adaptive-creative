import { NextRequest, NextResponse } from "next/server";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

// Market-specific modifications
const MARKET_MODIFICATIONS: Record<string, string[]> = {
  JP: [
    "Shortened duration by 15 seconds (faster pacing preference)",
    "Japanese voiceover with formal tone",
    "Added anime-style transitions",
    "Adjusted color grading (softer tones)",
    "Localized text overlays in Japanese",
  ],
  SA: [
    "Applied modest clothing overlays where needed",
    "Arabic voiceover (right-to-left text)",
    "Removed mixed-gender scenes",
    "Added cultural symbols (geometric patterns)",
    "Adjusted music to traditional instruments",
  ],
  IN: [
    "Hindi voiceover with energetic delivery",
    "Added cricket athlete scenes",
    "Vibrant color enhancement",
    "Bollywood-style music track",
    "Extended family-focused messaging",
  ],
  DE: [
    "German voiceover with direct, technical tone",
    "Emphasized product specifications",
    "Reduced emotional content, more factual",
    "Professional, minimalist aesthetic",
    "Added technical data overlays",
  ],
  BR: [
    "Portuguese voiceover with warm, energetic tone",
    "Samba-style background music",
    "Enhanced vibrant colors (carnival palette)",
    "Added community/social scenes",
    "Faster pacing with more cuts",
  ],
  KR: [
    "Korean voiceover with modern K-pop aesthetic",
    "Faster cuts and transitions",
    "K-pop style music track",
    "Enhanced visual effects",
    "Added trendy graphics and text animations",
  ],
  US: [
    "Original English voiceover maintained",
    "Optimized for US cultural preferences",
    "Standard pacing and transitions",
  ],
  GB: [
    "British English voiceover",
    "Adjusted humor and cultural references",
    "UK-specific product messaging",
  ],
  FR: [
    "French voiceover with sophisticated tone",
    "Emphasis on artistry and elegance",
    "Cultural references to French values",
  ],
  MX: [
    "Mexican Spanish voiceover",
    "Family-oriented messaging",
    "Vibrant colors and festive music",
  ],
};

const MARKET_NAMES: Record<string, string> = {
  JP: "Japan",
  SA: "Saudi Arabia",
  IN: "India",
  DE: "Germany",
  BR: "Brazil",
  KR: "South Korea",
  US: "United States",
  GB: "United Kingdom",
  FR: "France",
  MX: "Mexico",
};

export async function POST(request: NextRequest) {
  try {
    const { marketCode, originalText } = await request.json();

    if (!marketCode) {
      return NextResponse.json(
        { error: "Market code is required" },
        { status: 400 }
      );
    }

    console.log(`🎬 Starting video render for market: ${marketCode}`);
    console.log(`📝 Original text: "${originalText}"`);

    // Generate voiceover first
    let voiceoverPath: string | undefined;
    if (process.env.ELEVENLABS_API_KEY && originalText) {
      try {
        console.log(`🎙️ Generating voiceover for ${marketCode}...`);
        
        // Call voiceover generation directly
        const voiceResponse = await fetch('http://localhost:3000/api/generate-voiceover', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ marketCode, text: originalText }),
        });
        
        if (voiceResponse.ok) {
          const voiceData = await voiceResponse.json();
          // Use absolute file path
          voiceoverPath = path.join(process.cwd(), 'public', voiceData.audioUrl);
          console.log(`✅ Voiceover generated: ${voiceoverPath}`);
        }
      } catch (error) {
        console.log(`⚠️ Voiceover generation failed:`, error);
      }
    }

    // Create output directory if it doesn't exist
    const outputDir = path.join(process.cwd(), "public", "videos");
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }

    // Bundle the Remotion project
    console.log("📦 Bundling Remotion project...");
    const bundleLocation = await bundle({
      entryPoint: path.join(process.cwd(), "remotion", "index.ts"),
      webpackOverride: (config) => config,
    });

    // Get composition
    console.log("🎯 Selecting composition...");
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: "MarketVariant",
      inputProps: {
        marketCode,
        marketName: MARKET_NAMES[marketCode] || marketCode,
        modifications: MARKET_MODIFICATIONS[marketCode] || [],
        originalText: originalText || "You can't stop us. Together we rise.",
        voiceoverUrl: voiceoverPath,
      },
    });

    // Output file path
    const outputPath = path.join(outputDir, `${marketCode}-variant.mp4`);

    // Render the video
    console.log("🎥 Rendering video... (this may take 2-5 minutes)");
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: outputPath,
      inputProps: {
        marketCode,
        marketName: MARKET_NAMES[marketCode] || marketCode,
        modifications: MARKET_MODIFICATIONS[marketCode] || [],
        originalText: originalText || "You can't stop us. Together we rise.",
        voiceoverUrl: voiceoverPath,
      },
    });

    console.log(`✅ Video rendered successfully: ${outputPath}`);

    // Return the URL to the video
    const videoUrl = `/videos/${marketCode}-variant.mp4`;

    return NextResponse.json({
      success: true,
      videoUrl,
      marketCode,
      marketName: MARKET_NAMES[marketCode],
      message: "Video rendered successfully",
    });
  } catch (error: any) {
    console.error("❌ Error rendering video:", error);
    return NextResponse.json(
      {
        error: "Failed to render video",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
