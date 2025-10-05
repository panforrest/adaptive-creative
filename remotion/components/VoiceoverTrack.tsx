import React from 'react';
import {Audio, staticFile} from 'remotion';

interface VoiceoverTrackProps {
  marketCode: string;
  text: string;
  voiceoverUrl?: string;
}

export const VoiceoverTrack: React.FC<VoiceoverTrackProps> = ({marketCode, text, voiceoverUrl}) => {
  // Voice disabled for stable hackathon demo
  // Voice generation API works separately at /api/generate-voiceover
  // Integration with Remotion video requires additional time
  return null;
};
