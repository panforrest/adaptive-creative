import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

interface CulturalOverlayProps {
  marketCode: string;
}

export const CulturalOverlay: React.FC<CulturalOverlayProps> = ({marketCode}) => {
  const frame = useCurrentFrame();
  
  // Fade in cultural elements
  const opacity = interpolate(frame, [60, 120], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {/* Japan - Cherry blossom petals effect */}
      {marketCode === 'JP' && (
        <AbsoluteFill style={{opacity}}>
          {[...Array(10)].map((_, i) => {
            const x = (i * 10 + frame * 0.5) % 100;
            const y = (i * 15 + frame * 0.3) % 100;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${x}%`,
                  top: `${y}%`,
                  width: 20,
                  height: 20,
                  background: 'radial-gradient(circle, rgba(255,182,193,0.6) 0%, transparent 70%)',
                  borderRadius: '50%',
                }}
              />
            );
          })}
        </AbsoluteFill>
      )}
      
      {/* Saudi Arabia - Geometric patterns */}
      {marketCode === 'SA' && (
        <AbsoluteFill style={{opacity: opacity * 0.3}}>
          <svg width="100%" height="100%" style={{position: 'absolute'}}>
            <defs>
              <pattern id="geometric" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="50" height="50" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="2"/>
                <rect x="50" y="50" width="50" height="50" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="2"/>
                <circle cx="25" cy="25" r="15" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1"/>
                <circle cx="75" cy="75" r="15" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geometric)" />
          </svg>
        </AbsoluteFill>
      )}
      
      {/* India - Mandala-inspired patterns */}
      {marketCode === 'IN' && (
        <AbsoluteFill style={{opacity: opacity * 0.4}}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${frame * 0.5}deg)`,
              width: 400,
              height: 400,
              border: '3px solid rgba(255,215,0,0.3)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${-frame * 0.3}deg)`,
              width: 300,
              height: 300,
              border: '2px solid rgba(255,140,0,0.3)',
              borderRadius: '50%',
            }}
          />
        </AbsoluteFill>
      )}
      
      {/* Brazil - Confetti effect */}
      {marketCode === 'BR' && (
        <AbsoluteFill style={{opacity}}>
          {[...Array(20)].map((_, i) => {
            const x = (i * 5 + frame * 0.8) % 100;
            const y = (i * 7 + frame * 1.2) % 100;
            const colors = ['#00FF00', '#FFFF00', '#FF1493', '#00CED1'];
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${x}%`,
                  top: `${y}%`,
                  width: 10,
                  height: 10,
                  backgroundColor: colors[i % colors.length],
                  opacity: 0.6,
                  transform: `rotate(${frame * 2}deg)`,
                }}
              />
            );
          })}
        </AbsoluteFill>
      )}
      
      {/* South Korea - Neon grid */}
      {marketCode === 'KR' && (
        <AbsoluteFill style={{opacity: opacity * 0.2}}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="50" y2="0" stroke="rgba(255,20,147,0.5)" strokeWidth="1"/>
                <line x1="0" y1="0" x2="0" y2="50" stroke="rgba(0,206,209,0.5)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </AbsoluteFill>
      )}
      
      {/* Germany - Minimalist lines */}
      {marketCode === 'DE' && (
        <AbsoluteFill style={{opacity: opacity * 0.15}}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 0,
                top: `${i * 20}%`,
                width: '100%',
                height: 1,
                backgroundColor: 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
