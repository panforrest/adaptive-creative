import { NextRequest, NextResponse } from "next/server";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import { mkdir } from "fs/promises";
import { existsSync } from "fs";

// Market data
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
    const { marketCode, originalText, sourceVideo } = await request.json();

    if (!marketCode) {
      return NextResponse.json(
        { error: "Market code is required" },
        { status: 400 }
      );
    }

    console.log(`\n🎬 ========================================`);
    console.log(`   Rendering ${MARKET_NAMES[marketCode]} Variant`);
    console.log(`   Market Code: ${marketCode}`);
    console.log(`========================================\n`);

    // Create output directory
    const outputDir = path.join(process.cwd(), "public", "videos");
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }

    // Bundle the Remotion project
    console.log("📦 Step 1/4: Bundling Remotion project...");
    const startBundle = Date.now();
    const bundleLocation = await bundle({
      entryPoint: path.join(process.cwd(), "remotion", "index.ts"),
      webpackOverride: (config) => config,
    });
    console.log(`   ✅ Bundle created in ${Date.now() - startBundle}ms`);

    // Get composition
    console.log("\n🎯 Step 2/4: Selecting composition...");
    const startSelect = Date.now();
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: "MarketVariant",
      inputProps: {
        marketCode,
        marketName: MARKET_NAMES[marketCode] || marketCode,
        modifications: MARKET_MODIFICATIONS[marketCode] || [],
        originalText: originalText || "You can't stop us. Together we rise.",
      },
    });
    console.log(`   ✅ Composition selected in ${Date.now() - startSelect}ms`);
    console.log(`   📐 Dimensions: ${composition.width}x${composition.height}`);
    console.log(`   ⏱️  Duration: ${composition.durationInFrames} frames @ ${composition.fps}fps`);

    // Output file path
    const outputPath = path.join(outputDir, `${marketCode}-variant.mp4`);

    // Render the video
    console.log("\n🎥 Step 3/4: Rendering video...");
    console.log("   ⏳ This may take 2-5 minutes...");
    const startRender = Date.now();
    
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
      },
      onProgress: ({progress}) => {
        const percent = Math.round(progress * 100);
        if (percent % 10 === 0) {
          console.log(`   📊 Rendering progress: ${percent}%`);
        }
      },
    });
    
    const renderTime = Math.round((Date.now() - startRender) / 1000);
    console.log(`   ✅ Video rendered in ${renderTime} seconds`);

    // Return success
    console.log("\n✨ Step 4/4: Finalizing...");
    const videoUrl = `/videos/${marketCode}-variant.mp4`;
    console.log(`   ✅ Video available at: ${videoUrl}`);
    console.log(`\n🎉 SUCCESS! ${MARKET_NAMES[marketCode]} variant complete!\n`);

    return NextResponse.json({
      success: true,
      videoUrl,
      marketCode,
      marketName: MARKET_NAMES[marketCode],
      renderTime,
      message: "Video rendered successfully",
    });
  } catch (error: any) {
    console.error("\n❌ ERROR rendering video:", error);
    console.error("   Details:", error.message);
    console.error("   Stack:", error.stack);
    
    return NextResponse.json(
      {
        error: "Failed to render video",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
