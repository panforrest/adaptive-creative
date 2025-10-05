import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// Market-specific language codes for ElevenLabs
const LANGUAGE_CODES: Record<string, string> = {
  JP: "ja",      // Japanese
  SA: "ar",      // Arabic
  IN: "hi",      // Hindi
  DE: "de",      // German
  BR: "pt",      // Portuguese
  KR: "ko",      // Korean
  US: "en",      // English
  GB: "en",      // English (British)
  FR: "fr",      // French
  MX: "es",      // Spanish
};

// Voice characteristics per market
const VOICE_SETTINGS: Record<string, any> = {
  JP: { stability: 0.7, similarity_boost: 0.8, style: 0.3 },
  SA: { stability: 0.8, similarity_boost: 0.7, style: 0.4 },
  IN: { stability: 0.6, similarity_boost: 0.9, style: 0.6 },
  DE: { stability: 0.8, similarity_boost: 0.7, style: 0.2 },
  BR: { stability: 0.5, similarity_boost: 0.9, style: 0.7 },
  KR: { stability: 0.6, similarity_boost: 0.8, style: 0.8 },
  US: { stability: 0.7, similarity_boost: 0.8, style: 0.5 },
  GB: { stability: 0.7, similarity_boost: 0.8, style: 0.5 },
  FR: { stability: 0.7, similarity_boost: 0.8, style: 0.6 },
  MX: { stability: 0.6, similarity_boost: 0.9, style: 0.7 },
};

export async function POST(request: NextRequest) {
  try {
    const { marketCode, text } = await request.json();

    console.log(`🎙️ Generating voiceover for ${marketCode}...`);
    console.log(`📝 Original text: "${text}"`);

    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      console.log("⚠️ ElevenLabs API key not set, using mock voiceover");
      
      // Return mock response
      return NextResponse.json({
        success: true,
        audioUrl: `/voiceover/${marketCode}-mock.mp3`,
        message: "Mock voiceover (ElevenLabs API key not configured)",
        isMock: true,
      });
    }

    // Real ElevenLabs API integration
    const voiceId = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";
    const voiceSettings = VOICE_SETTINGS[marketCode] || VOICE_SETTINGS.US;

    console.log(`   Voice ID: ${voiceId}`);
    console.log(`   Voice Settings:`, voiceSettings);

    // For hackathon demo: Use English text with market-specific voice characteristics
    // In production: Would translate text to target language first
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_monolingual_v1", // Use monolingual for consistent English
          voice_settings: voiceSettings,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`);
    }

    // Save audio file
    const audioBuffer = await response.arrayBuffer();
    const voiceoverDir = path.join(process.cwd(), "public", "voiceover");
    
    // Ensure directory exists
    if (!existsSync(voiceoverDir)) {
      await mkdir(voiceoverDir, { recursive: true });
    }
    
    const audioPath = path.join(voiceoverDir, `${marketCode}-voiceover.mp3`);
    await writeFile(audioPath, Buffer.from(audioBuffer));

    console.log(`   ✅ Voiceover saved: ${audioPath}`);

    return NextResponse.json({
      success: true,
      audioUrl: `/voiceover/${marketCode}-voiceover.mp3`,
      message: "Voiceover generated successfully",
      isMock: false,
    });
  } catch (error: any) {
    console.error("❌ Error generating voiceover:", error);
    
    return NextResponse.json(
      {
        error: "Failed to generate voiceover",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
