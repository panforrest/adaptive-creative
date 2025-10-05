import { NextRequest, NextResponse } from "next/server";

// Cultural adaptation rules for each market
const CULTURAL_RULES: Record<string, any> = {
  JP: {
    name: "Japan",
    language: "ja-JP",
    modifications: [
      "Shortened duration by 15 seconds (faster pacing preference)",
      "Japanese voiceover with formal tone",
      "Added anime-style transitions",
      "Adjusted color grading (softer tones)",
      "Localized text overlays in Japanese",
    ],
    voiceSettings: {
      stability: 0.7,
      similarity_boost: 0.8,
      style: 0.3,
    },
  },
  SA: {
    name: "Saudi Arabia",
    language: "ar-SA",
    modifications: [
      "Applied modest clothing overlays where needed",
      "Arabic voiceover (right-to-left text)",
      "Removed mixed-gender scenes",
      "Added cultural symbols (geometric patterns)",
      "Adjusted music to traditional instruments",
    ],
    voiceSettings: {
      stability: 0.8,
      similarity_boost: 0.7,
      style: 0.4,
    },
  },
  IN: {
    name: "India",
    language: "hi-IN",
    modifications: [
      "Hindi voiceover with energetic delivery",
      "Added cricket athlete scenes",
      "Vibrant color enhancement",
      "Bollywood-style music track",
      "Extended family-focused messaging",
    ],
    voiceSettings: {
      stability: 0.6,
      similarity_boost: 0.9,
      style: 0.6,
    },
  },
  DE: {
    name: "Germany",
    language: "de-DE",
    modifications: [
      "German voiceover with direct, technical tone",
      "Emphasized product specifications",
      "Reduced emotional content, more factual",
      "Professional, minimalist aesthetic",
      "Added technical data overlays",
    ],
    voiceSettings: {
      stability: 0.8,
      similarity_boost: 0.7,
      style: 0.2,
    },
  },
  BR: {
    name: "Brazil",
    language: "pt-BR",
    modifications: [
      "Portuguese voiceover with warm, energetic tone",
      "Samba-style background music",
      "Enhanced vibrant colors (carnival palette)",
      "Added community/social scenes",
      "Faster pacing with more cuts",
    ],
    voiceSettings: {
      stability: 0.5,
      similarity_boost: 0.9,
      style: 0.7,
    },
  },
  KR: {
    name: "South Korea",
    language: "ko-KR",
    modifications: [
      "Korean voiceover with modern K-pop aesthetic",
      "Faster cuts and transitions",
      "K-pop style music track",
      "Enhanced visual effects",
      "Added trendy graphics and text animations",
    ],
    voiceSettings: {
      stability: 0.6,
      similarity_boost: 0.8,
      style: 0.8,
    },
  },
  US: {
    name: "United States",
    language: "en-US",
    modifications: [
      "Original English voiceover maintained",
      "Optimized for US cultural preferences",
      "Standard pacing and transitions",
    ],
    voiceSettings: {
      stability: 0.7,
      similarity_boost: 0.8,
      style: 0.5,
    },
  },
  GB: {
    name: "United Kingdom",
    language: "en-GB",
    modifications: [
      "British English voiceover",
      "Adjusted humor and cultural references",
      "UK-specific product messaging",
    ],
    voiceSettings: {
      stability: 0.7,
      similarity_boost: 0.8,
      style: 0.5,
    },
  },
  FR: {
    name: "France",
    language: "fr-FR",
    modifications: [
      "French voiceover with sophisticated tone",
      "Emphasis on artistry and elegance",
      "Cultural references to French values",
    ],
    voiceSettings: {
      stability: 0.7,
      similarity_boost: 0.8,
      style: 0.6,
    },
  },
  MX: {
    name: "Mexico",
    language: "es-MX",
    modifications: [
      "Mexican Spanish voiceover",
      "Family-oriented messaging",
      "Vibrant colors and festive music",
    ],
    voiceSettings: {
      stability: 0.6,
      similarity_boost: 0.9,
      style: 0.7,
    },
  },
};

// ElevenLabs voice cloning
async function generateVoiceover(text: string, marketCode: string) {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    console.log("ElevenLabs API key not set, skipping voice generation");
    return null;
  }

  try {
    const rules = CULTURAL_RULES[marketCode];
    
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID || 'default'}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: rules.voiceSettings,
          language_code: rules.language,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("ElevenLabs API failed");
    }

    const audioBuffer = await response.arrayBuffer();
    return Buffer.from(audioBuffer).toString("base64");
  } catch (error) {
    console.error("ElevenLabs error:", error);
    return null;
  }
}

// AWS Bedrock cultural adaptation
async function getCulturalAdaptations(marketCode: string, videoAnalysis: any) {
  // For demo, return predefined rules
  // In production, use AWS Bedrock to generate dynamic adaptations
  
  const rules = CULTURAL_RULES[marketCode];
  
  if (!rules) {
    return {
      modifications: ["Standard localization applied"],
      culturalNotes: "No specific cultural rules defined for this market",
    };
  }

  return {
    modifications: rules.modifications,
    culturalNotes: `Adapted for ${rules.name} market preferences`,
    language: rules.language,
  };
}

// Swayable persuasion scoring
async function getPersuasionScore(marketCode: string, modifications: string[]) {
  const apiKey = process.env.SWAYABLE_API_KEY;

  if (!apiKey) {
    // Return mock score
    return 75 + Math.random() * 20;
  }

  try {
    // In production, call Swayable API with variant details
    // For now, return calculated score based on modifications
    const baseScore = 70;
    const modificationBonus = modifications.length * 3;
    const randomVariance = Math.random() * 15;
    
    return Math.min(95, baseScore + modificationBonus + randomVariance);
  } catch (error) {
    console.error("Swayable error:", error);
    return 75;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { marketCodes, videoAnalysis } = await request.json();

    if (!marketCodes || marketCodes.length === 0) {
      return NextResponse.json(
        { error: "No markets selected" },
        { status: 400 }
      );
    }

    const variants = [];

    for (const marketCode of marketCodes) {
      // Get cultural adaptations
      const adaptations = await getCulturalAdaptations(marketCode, videoAnalysis);

      // Generate voiceover (if API key available)
      const voiceoverText = videoAnalysis?.voiceover?.text || "Demo voiceover text";
      const voiceover = await generateVoiceover(voiceoverText, marketCode);

      // Get persuasion score
      const persuasionScore = await getPersuasionScore(marketCode, adaptations.modifications);

      variants.push({
        marketCode,
        marketName: CULTURAL_RULES[marketCode]?.name || marketCode,
        modifications: adaptations.modifications,
        culturalNotes: adaptations.culturalNotes,
        language: adaptations.language,
        voiceover: voiceover ? `data:audio/mpeg;base64,${voiceover}` : null,
        persuasionScore: Math.round(persuasionScore),
        status: "complete",
        videoUrl: `/api/variants/${marketCode}.mp4`, // Mock URL
      });
    }

    return NextResponse.json({
      success: true,
      variants,
      processingTime: variants.length * 2.5, // Simulated processing time in seconds
    });
  } catch (error) {
    console.error("Variant generation error:", error);
    return NextResponse.json(
      { error: "Variant generation failed" },
      { status: 500 }
    );
  }
}
