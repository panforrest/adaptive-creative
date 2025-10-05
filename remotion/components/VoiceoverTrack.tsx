import React from 'react';
import {Audio, staticFile} from 'remotion';

interface VoiceoverTrackProps {
  marketCode: string;
  text: string;
}

export const VoiceoverTrack: React.FC<VoiceoverTrackProps> = ({marketCode, text}) => {
  // Voiceover disabled for hackathon demo
  // Voice generation works (see /api/generate-voiceover)
  // Integration with Remotion requires additional configuration
  return null;
};
