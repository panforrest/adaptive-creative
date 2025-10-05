import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

interface AnimatedBackgroundProps {
  marketCode: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({marketCode}) => {
  const frame = useCurrentFrame();
  
  // Market-specific color schemes
  const colorSchemes: Record<string, {primary: string; secondary: string; tertiary: string}> = {
    JP: {primary: '#FF6B9D', secondary: '#C44569', tertiary: '#FFC3A0'}, // Soft pink/coral
    SA: {primary: '#8B4513', secondary: '#D4AF37', tertiary: '#CD853F'}, // Gold/brown
    IN: {primary: '#FF6F00', secondary: '#FF4081', tertiary: '#FFD700'}, // Vibrant orange/pink
    DE: {primary: '#424242', secondary: '#757575', tertiary: '#BDBDBD'}, // Gray/professional
    BR: {primary: '#00FF00', secondary: '#FFFF00', tertiary: '#FF1493'}, // Carnival colors
    KR: {primary: '#FF1493', secondary: '#00CED1', tertiary: '#FF69B4'}, // K-pop neon
    US: {primary: '#667eea', secondary: '#764ba2', tertiary: '#f093fb'}, // Original
    GB: {primary: '#667eea', secondary: '#764ba2', tertiary: '#f093fb'}, // Original
    FR: {primary: '#4A148C', secondary: '#7B1FA2', tertiary: '#E1BEE7'}, // Elegant purple
    MX: {primary: '#FF6F00', secondary: '#00C853', tertiary: '#FF1744'}, // Mexican flag colors
  };
  
  const colors = colorSchemes[marketCode] || colorSchemes.US;
  
  // Animated gradient rotation
  const rotation = interpolate(frame, [0, 900], [0, 360], {
    extrapolateRight: 'wrap',
  });
  
  // Pulsing effect
  const scale = interpolate(
    frame % 60,
    [0, 30, 60],
    [1, 1.05, 1],
    {extrapolateRight: 'wrap'}
  );
  
  return (
    <AbsoluteFill>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(${rotation}deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.tertiary} 100%)`,
          transform: `scale(${scale})`,
        }}
      />
      
      {/* Overlay pattern for texture */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
      
      {/* Market-specific patterns */}
      {marketCode === 'JP' && (
        <AbsoluteFill
          style={{
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)',
            pointerEvents: 'none',
          }}
        />
      )}
      
      {marketCode === 'SA' && (
        <AbsoluteFill
          style={{
            background: 'repeating-conic-gradient(from 0deg, transparent 0deg 30deg, rgba(212,175,55,0.1) 30deg 60deg)',
            pointerEvents: 'none',
          }}
        />
      )}
      
      {marketCode === 'IN' && (
        <AbsoluteFill
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,215,0,0.2) 0%, transparent 40%)',
            animation: 'pulse 2s infinite',
            pointerEvents: 'none',
          }}
        />
      )}
    </AbsoluteFill>
  );
};
