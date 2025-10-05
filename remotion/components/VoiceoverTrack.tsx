import React from 'react';
import {Audio} from 'remotion';

interface VoiceoverTrackProps {
  marketCode: string;
  text: string;
  voiceoverUrl?: string;
}

export const VoiceoverTrack: React.FC<VoiceoverTrackProps> = ({marketCode, text, voiceoverUrl}) => {
  // If voiceover URL is provided, use it
  if (!voiceoverUrl) {
    return null;
  }
  
  return (
    <Audio
      src={voiceoverUrl}
      volume={0.8}
      startFrom={0}
    />
  );
};
