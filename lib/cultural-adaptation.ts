// Cultural Adaptation Engine
// Uses AWS Bedrock (Claude) for intelligent cultural recommendations

export interface CulturalProfile {
  market: string;
  marketCode: string;
  language: string;
  visualSensitivities: string[];
  audioPreferences: string[];
  textRequirements: string[];
  colorPsychology: Record<string, string>;
  pacingPreference: "fast" | "medium" | "slow";
  formalityLevel: "casual" | "neutral" | "formal";
  culturalSymbols: {
    positive: string[];
    negative: string[];
  };
}

export const CULTURAL_PROFILES: Record<string, CulturalProfile> = {
  US: {
    market: "United States",
    marketCode: "US",
    language: "en-US",
    visualSensitivities: ["minimal"],
    audioPreferences: ["upbeat", "energetic", "diverse voices"],
    textRequirements: ["casual", "action-oriented"],
    colorPsychology: {
      red: "excitement",
      blue: "trust",
      green: "growth",
    },
    pacingPreference: "fast",
    formalityLevel: "casual",
    culturalSymbols: {
      positive: ["flag", "eagle", "stars"],
      negative: [],
    },
  },
  JP: {
    market: "Japan",
    marketCode: "JP",
    language: "ja-JP",
    visualSensitivities: ["avoid excessive emotion", "prefer subtlety"],
    audioPreferences: ["formal tone", "polite language", "soft music"],
    textRequirements: ["formal Japanese", "vertical text option", "honorifics"],
    colorPsychology: {
      red: "strength",
      white: "purity",
      gold: "wealth",
    },
    pacingPreference: "medium",
    formalityLevel: "formal",
    culturalSymbols: {
      positive: ["cherry blossoms", "Mount Fuji", "traditional patterns"],
      negative: ["number 4", "excessive individualism"],
    },
  },
  SA: {
    market: "Saudi Arabia",
    marketCode: "SA",
    language: "ar-SA",
    visualSensitivities: [
      "modest clothing required",
      "avoid mixed-gender scenes",
      "no alcohol/pork imagery",
      "respect religious symbols",
    ],
    audioPreferences: ["traditional instruments", "formal Arabic", "male voiceover preferred"],
    textRequirements: ["right-to-left text", "formal Arabic", "Islamic greetings"],
    colorPsychology: {
      green: "Islam/paradise",
      gold: "wealth",
      white: "purity",
    },
    pacingPreference: "medium",
    formalityLevel: "formal",
    culturalSymbols: {
      positive: ["geometric patterns", "calligraphy", "desert imagery"],
      negative: ["religious mockery", "immodest dress", "alcohol"],
    },
  },
  IN: {
    market: "India",
    marketCode: "IN",
    language: "hi-IN",
    visualSensitivities: ["respect religious diversity", "family-oriented"],
    audioPreferences: ["Bollywood style", "energetic", "multiple languages"],
    textRequirements: ["Hindi/English mix", "colorful typography"],
    colorPsychology: {
      red: "purity/fertility",
      saffron: "sacred",
      green: "prosperity",
    },
    pacingPreference: "fast",
    formalityLevel: "neutral",
    culturalSymbols: {
      positive: ["festivals", "family", "cricket", "Bollywood"],
      negative: ["cow imagery in food context", "religious insensitivity"],
    },
  },
  DE: {
    market: "Germany",
    marketCode: "DE",
    language: "de-DE",
    visualSensitivities: ["prefer facts over emotion", "professional aesthetic"],
    audioPreferences: ["clear pronunciation", "technical details", "direct messaging"],
    textRequirements: ["formal German", "technical accuracy"],
    colorPsychology: {
      blue: "reliability",
      gray: "professionalism",
      green: "sustainability",
    },
    pacingPreference: "medium",
    formalityLevel: "formal",
    culturalSymbols: {
      positive: ["engineering", "precision", "sustainability"],
      negative: ["Nazi symbols", "excessive patriotism"],
    },
  },
  BR: {
    market: "Brazil",
    marketCode: "BR",
    language: "pt-BR",
    visualSensitivities: ["celebrate diversity", "body positive"],
    audioPreferences: ["samba/bossa nova", "energetic", "warm tone"],
    textRequirements: ["Portuguese (not Spanish)", "casual language"],
    colorPsychology: {
      yellow: "joy",
      green: "nature",
      blue: "sky/ocean",
    },
    pacingPreference: "fast",
    formalityLevel: "casual",
    culturalSymbols: {
      positive: ["carnival", "soccer", "beach", "family"],
      negative: ["Spanish language confusion"],
    },
  },
  KR: {
    market: "South Korea",
    marketCode: "KR",
    language: "ko-KR",
    visualSensitivities: ["K-pop aesthetic", "beauty standards", "technology focus"],
    audioPreferences: ["K-pop style", "fast-paced", "trendy"],
    textRequirements: ["Korean", "modern slang", "emoji usage"],
    colorPsychology: {
      red: "passion",
      white: "purity",
      black: "sophistication",
    },
    pacingPreference: "fast",
    formalityLevel: "neutral",
    culturalSymbols: {
      positive: ["K-pop", "technology", "beauty", "food"],
      negative: ["Japanese colonial references", "number 4"],
    },
  },
  FR: {
    market: "France",
    marketCode: "FR",
    language: "fr-FR",
    visualSensitivities: ["artistic", "sophisticated", "avoid American clichés"],
    audioPreferences: ["elegant music", "proper French", "cultural references"],
    textRequirements: ["proper French grammar", "avoid anglicisms"],
    colorPsychology: {
      blue: "freedom",
      red: "passion",
      white: "purity",
    },
    pacingPreference: "medium",
    formalityLevel: "formal",
    culturalSymbols: {
      positive: ["art", "cuisine", "fashion", "culture"],
      negative: ["American cultural imperialism", "poor French"],
    },
  },
  MX: {
    market: "Mexico",
    marketCode: "MX",
    language: "es-MX",
    visualSensitivities: ["family-oriented", "colorful", "festive"],
    audioPreferences: ["mariachi/regional", "warm tone", "family focus"],
    textRequirements: ["Mexican Spanish", "casual but respectful"],
    colorPsychology: {
      red: "passion",
      green: "independence",
      pink: "celebration",
    },
    pacingPreference: "medium",
    formalityLevel: "neutral",
    culturalSymbols: {
      positive: ["family", "festivals", "food", "tradition"],
      negative: ["stereotypes", "drug cartel references"],
    },
  },
  GB: {
    market: "United Kingdom",
    marketCode: "GB",
    language: "en-GB",
    visualSensitivities: ["understated", "humor appreciated", "avoid excess"],
    audioPreferences: ["British accent", "wit", "understatement"],
    textRequirements: ["British spelling", "subtle humor"],
    colorPsychology: {
      red: "tradition",
      blue: "royalty",
      green: "countryside",
    },
    pacingPreference: "medium",
    formalityLevel: "neutral",
    culturalSymbols: {
      positive: ["humor", "tradition", "countryside", "tea"],
      negative: ["American spelling", "over-enthusiasm"],
    },
  },
};

export interface AdaptationRecommendation {
  category: "visual" | "audio" | "text" | "pacing" | "cultural";
  action: string;
  reason: string;
  priority: "high" | "medium" | "low";
}

export function getAdaptationRecommendations(
  marketCode: string,
  videoAnalysis: any
): AdaptationRecommendation[] {
  const profile = CULTURAL_PROFILES[marketCode];
  if (!profile) {
    return [];
  }

  const recommendations: AdaptationRecommendation[] = [];

  // Visual adaptations
  if (profile.visualSensitivities.length > 0) {
    profile.visualSensitivities.forEach(sensitivity => {
      recommendations.push({
        category: "visual",
        action: `Apply ${sensitivity}`,
        reason: `Cultural sensitivity for ${profile.market}`,
        priority: "high",
      });
    });
  }

  // Audio adaptations
  recommendations.push({
    category: "audio",
    action: `Generate ${profile.language} voiceover`,
    reason: `Localize for ${profile.market} audience`,
    priority: "high",
  });

  if (profile.audioPreferences.includes("traditional instruments")) {
    recommendations.push({
      category: "audio",
      action: "Replace background music with traditional instruments",
      reason: `${profile.market} prefers culturally relevant music`,
      priority: "medium",
    });
  }

  // Pacing adaptations
  if (profile.pacingPreference === "fast" && videoAnalysis?.duration > 60) {
    recommendations.push({
      category: "pacing",
      action: "Reduce duration by 15-20%",
      reason: `${profile.market} prefers faster-paced content`,
      priority: "medium",
    });
  }

  // Text adaptations
  recommendations.push({
    category: "text",
    action: `Translate text overlays to ${profile.language}`,
    reason: "Ensure message clarity in local language",
    priority: "high",
  });

  // Cultural symbol adaptations
  if (profile.culturalSymbols.negative.length > 0) {
    recommendations.push({
      category: "cultural",
      action: `Review and remove: ${profile.culturalSymbols.negative.join(", ")}`,
      reason: "Avoid culturally insensitive elements",
      priority: "high",
    });
  }

  return recommendations;
}

export function getCulturalProfile(marketCode: string): CulturalProfile | null {
  return CULTURAL_PROFILES[marketCode] || null;
}

export function getAllMarkets(): CulturalProfile[] {
  return Object.values(CULTURAL_PROFILES);
}
