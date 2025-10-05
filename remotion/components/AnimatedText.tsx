import React from 'react';
import {useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';

interface AnimatedTextProps {
  text: string;
  marketCode: string;
  startFrame?: number;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  marketCode,
  startFrame = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const relativeFrame = Math.max(0, frame - startFrame);
  
  // Spring animation for smooth entrance
  const progress = spring({
    frame: relativeFrame,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });
  
  // Market-specific text animations
  const getAnimation = () => {
    switch (marketCode) {
      case 'JP': // Slide from right (manga style)
        return {
          transform: `translateX(${interpolate(progress, [0, 1], [100, 0])}px)`,
          opacity: progress,
        };
      
      case 'SA': // Fade in from center (respectful)
        return {
          transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
          opacity: progress,
        };
      
      case 'IN': // Bounce in (energetic)
        const bounce = spring({
          frame: relativeFrame,
          fps,
          config: {
            damping: 10,
            stiffness: 200,
          },
        });
        return {
          transform: `scale(${bounce})`,
          opacity: progress,
        };
      
      case 'BR': // Rotate in (festive)
        return {
          transform: `rotate(${interpolate(progress, [0, 1], [-10, 0])}deg) scale(${progress})`,
          opacity: progress,
        };
      
      case 'KR': // Glitch effect (K-pop style)
        const glitch = relativeFrame < 10 ? Math.random() * 5 : 0;
        return {
          transform: `translateX(${glitch}px)`,
          opacity: progress,
          textShadow: relativeFrame < 10 
            ? `${glitch}px 0 #FF1493, -${glitch}px 0 #00CED1`
            : 'none',
        };
      
      case 'DE': // Slide from left (direct)
        return {
          transform: `translateX(${interpolate(progress, [0, 1], [-50, 0])}px)`,
          opacity: progress,
        };
      
      default: // Fade in
        return {
          opacity: progress,
        };
    }
  };
  
  return (
    <div
      style={{
        ...style,
        ...getAnimation(),
      }}
    >
      {text}
    </div>
  );
};
