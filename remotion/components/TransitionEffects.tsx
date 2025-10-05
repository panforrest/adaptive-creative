import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';

interface TransitionEffectsProps {
  marketCode: string;
}

export const TransitionEffects: React.FC<TransitionEffectsProps> = ({marketCode}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  // Opening transition (0-30 frames)
  const openingProgress = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });
  
  // Market-specific transition styles
  const getTransition = () => {
    switch (marketCode) {
      case 'JP': // Anime-style wipe
        return (
          <AbsoluteFill
            style={{
              background: 'linear-gradient(90deg, #FF6B9D 0%, transparent 100%)',
              transform: `translateX(${interpolate(openingProgress, [0, 1], [-100, 100])}%)`,
            }}
          />
        );
      
      case 'SA': // Geometric reveal
        return (
          <AbsoluteFill
            style={{
              clipPath: `polygon(
                ${interpolate(openingProgress, [0, 1], [50, 0])}% 0%,
                ${interpolate(openingProgress, [0, 1], [50, 100])}% 0%,
                ${interpolate(openingProgress, [0, 1], [50, 100])}% 100%,
                ${interpolate(openingProgress, [0, 1], [50, 0])}% 100%
              )`,
              background: 'rgba(212, 175, 55, 0.9)',
            }}
          />
        );
      
      case 'IN': // Mandala expand
        const scale = interpolate(openingProgress, [0, 1], [0, 3]);
        return (
          <AbsoluteFill
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                border: '20px solid rgba(255, 140, 0, 0.8)',
                transform: `scale(${scale})`,
                opacity: interpolate(openingProgress, [0, 0.5, 1], [1, 0.5, 0]),
              }}
            />
          </AbsoluteFill>
        );
      
      case 'BR': // Carnival burst
        return (
          <>
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * 360;
              const distance = interpolate(openingProgress, [0, 1], [0, 150]);
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: 50,
                    height: 50,
                    backgroundColor: ['#00FF00', '#FFFF00', '#FF1493'][i % 3],
                    transform: `
                      translate(-50%, -50%)
                      rotate(${angle}deg)
                      translateY(-${distance}%)
                    `,
                    opacity: interpolate(openingProgress, [0, 0.7, 1], [1, 0.5, 0]),
                  }}
                />
              );
            })}
          </>
        );
      
      case 'KR': // Neon flash
        return (
          <AbsoluteFill
            style={{
              background: `linear-gradient(${frame * 10}deg, #FF1493, #00CED1)`,
              opacity: interpolate(openingProgress, [0, 0.3, 1], [1, 0.5, 0]),
              mixBlendMode: 'screen',
            }}
          />
        );
      
      case 'DE': // Minimal slide
        return (
          <AbsoluteFill
            style={{
              background: '#424242',
              transform: `translateY(${interpolate(openingProgress, [0, 1], [0, -100])}%)`,
            }}
          />
        );
      
      default: // Fade in
        return (
          <AbsoluteFill
            style={{
              backgroundColor: '#000',
              opacity: interpolate(openingProgress, [0, 1], [1, 0]),
            }}
          />
        );
    }
  };
  
  // Only show transition in first 30 frames
  if (frame > 30) {
    return null;
  }
  
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {getTransition()}
    </AbsoluteFill>
  );
};
