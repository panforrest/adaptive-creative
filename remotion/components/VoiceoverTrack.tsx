import React from 'react';
import {Audio, staticFile} from 'remotion';

interface VoiceoverTrackProps {
  marketCode: string;
  text: string;
}

export const VoiceoverTrack: React.FC<VoiceoverTrackProps> = ({marketCode, text}) => {
  // Only enable voiceover for markets where we have generated audio files
  // Currently only JP has a generated file
  const marketsWithVoice = ['JP']; // Add more as they're generated
  
  const hasVoiceover = marketsWithVoice.includes(marketCode);
  
  if (!hasVoiceover) {
    console.log(`No voiceover file for ${marketCode}, skipping audio`);
    return null;
  }
  
  const voiceoverFile = `voiceover/${marketCode}-voiceover.mp3`;
  console.log(`Loading voiceover: ${voiceoverFile}`);
  
  return (
    <Audio
      src={staticFile(voiceoverFile)}
      volume={0.8}
      startFrom={0}
    />
  );
};
