// Simple Text-to-Speech using browser API for demo
// This is a fallback when ElevenLabs API is not configured

export async function generateSimpleVoiceover(
  text: string,
  marketCode: string
): Promise<string> {
  console.log(`🎙️ Generating simple TTS for ${marketCode}: "${text}"`);
  
  // For demo purposes, return a placeholder
  // In a real implementation, this would use Web Speech API or similar
  return `/voiceover/${marketCode}-placeholder.mp3`;
}

// Market-specific voice characteristics
export const VOICE_CHARACTERISTICS = {
  JP: { pitch: 1.1, rate: 0.9, volume: 0.8 }, // Softer, slower
  SA: { pitch: 0.9, rate: 0.85, volume: 0.9 }, // Deeper, respectful
  IN: { pitch: 1.0, rate: 1.1, volume: 1.0 }, // Energetic
  DE: { pitch: 0.95, rate: 1.0, volume: 0.9 }, // Direct, clear
  BR: { pitch: 1.05, rate: 1.15, volume: 1.0 }, // Warm, fast
  KR: { pitch: 1.1, rate: 1.2, volume: 1.0 }, // Modern, quick
  US: { pitch: 1.0, rate: 1.0, volume: 1.0 }, // Standard
  GB: { pitch: 1.0, rate: 0.95, volume: 0.9 }, // Refined
  FR: { pitch: 1.0, rate: 0.9, volume: 0.85 }, // Sophisticated
  MX: { pitch: 1.05, rate: 1.1, volume: 1.0 }, // Warm, energetic
};
