import React from 'react';
import {Audio, staticFile} from 'remotion';

interface VoiceoverTrackProps {
  marketCode: string;
  text: string;
  voiceoverUrl?: string;
}

export const VoiceoverTrack: React.FC<VoiceoverTrackProps> = ({marketCode, text, voiceoverUrl}) => {
  // Check if we should load voiceover
  // Only enable for markets where we've generated audio
  const hasVoiceover = voiceoverUrl || marketCode === 'JP';
  
  if (!hasVoiceover) {
    return null;
  }
  
  // Use provided URL or construct from marketCode
  const audioSrc = voiceoverUrl || staticFile(`voiceover/${marketCode}-voiceover.mp3`);
  
  return (
    <Audio
      src={audioSrc}
      volume={0.8}
      startFrom={0}
    />
  );
};
