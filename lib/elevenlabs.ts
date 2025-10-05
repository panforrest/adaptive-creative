// ElevenLabs API Client for Voice Cloning and Multilingual Dubbing

const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1";

export interface ElevenLabsConfig {
  apiKey: string;
}

export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style?: number;
  use_speaker_boost?: boolean;
}

export class ElevenLabsClient {
  private apiKey: string;

  constructor(config: ElevenLabsConfig) {
    this.apiKey = config.apiKey;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${ELEVENLABS_API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": this.apiKey,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`ElevenLabs API error: ${error}`);
    }

    return response;
  }

  async getVoices() {
    const response = await this.request("/voices");
    return response.json();
  }

  async textToSpeech(
    text: string,
    voiceId: string = "21m00Tcm4TlvDq8ikWAM", // Default voice
    settings?: VoiceSettings
  ): Promise<ArrayBuffer> {
    const response = await this.request(`/text-to-speech/${voiceId}`, {
      method: "POST",
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: settings || {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.5,
          use_speaker_boost: true,
        },
      }),
    });

    return response.arrayBuffer();
  }

  async generateVoiceoverForMarket(
    text: string,
    targetLanguage: string,
    emotion: string = "neutral"
  ): Promise<ArrayBuffer> {
    // Adjust voice settings based on emotion
    const emotionSettings: Record<string, VoiceSettings> = {
      inspirational: {
        stability: 0.4,
        similarity_boost: 0.8,
        style: 0.7,
        use_speaker_boost: true,
      },
      energetic: {
        stability: 0.3,
        similarity_boost: 0.85,
        style: 0.8,
        use_speaker_boost: true,
      },
      calm: {
        stability: 0.7,
        similarity_boost: 0.7,
        style: 0.3,
        use_speaker_boost: false,
      },
      professional: {
        stability: 0.6,
        similarity_boost: 0.75,
        style: 0.4,
        use_speaker_boost: true,
      },
      neutral: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.5,
        use_speaker_boost: true,
      },
    };

    const settings = emotionSettings[emotion] || emotionSettings.neutral;

    // Use multilingual model for target language
    return this.textToSpeech(text, "21m00Tcm4TlvDq8ikWAM", settings);
  }

  async dubVideo(
    sourceLanguage: string,
    targetLanguage: string,
    fileUrl: string
  ) {
    // This would use ElevenLabs dubbing API
    // For hackathon, we'll use text-to-speech with translated text
    const response = await this.request("/dubbing", {
      method: "POST",
      body: JSON.stringify({
        source_url: fileUrl,
        source_lang: sourceLanguage,
        target_lang: targetLanguage,
      }),
    });

    return response.json();
  }
}

export function createElevenLabsClient(apiKey?: string) {
  const key = apiKey || process.env.ELEVENLABS_API_KEY;

  if (!key) {
    throw new Error("ElevenLabs API key not configured");
  }

  return new ElevenLabsClient({ apiKey: key });
}

// Language code mapping for ElevenLabs
export const LANGUAGE_CODES: Record<string, string> = {
  US: "en",
  GB: "en",
  JP: "ja",
  SA: "ar",
  IN: "hi",
  DE: "de",
  BR: "pt",
  KR: "ko",
  FR: "fr",
  MX: "es",
  CN: "zh",
  IT: "it",
  ES: "es",
  RU: "ru",
  TR: "tr",
  NL: "nl",
  PL: "pl",
  SE: "sv",
  NO: "no",
  DK: "da",
};

export function getLanguageCode(marketCode: string): string {
  return LANGUAGE_CODES[marketCode] || "en";
}
