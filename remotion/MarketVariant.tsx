import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Sequence, Video, staticFile} from 'remotion';
import {AnimatedBackground} from './components/AnimatedBackground';
import {CulturalOverlay} from './components/CulturalOverlay';
import {AudioTrack} from './components/AudioTrack';

interface MarketVariantProps {
  marketCode: string;
  marketName: string;
  modifications: string[];
  originalText: string;
}

export const MarketVariant: React.FC<MarketVariantProps> = ({
  marketCode,
  marketName,
  modifications,
  originalText,
}) => {
  const frame = useCurrentFrame();
  
  // Try to use sample video, fallback to gradient
  const hasVideo = false; // Set to true if you add sample-ad.mp4 to public folder

  // Color grading based on market
  const colorFilters: Record<string, string> = {
    JP: 'saturate(0.8) brightness(1.1)', // Softer tones for Japan
    SA: 'contrast(1.1) brightness(1.05)', // Traditional look for Saudi Arabia
    IN: 'saturate(1.3) brightness(1.1)', // Vibrant colors for India
    DE: 'saturate(0.9) contrast(1.05)', // Professional for Germany
    BR: 'saturate(1.4) brightness(1.15)', // Carnival palette for Brazil
    KR: 'saturate(1.2) contrast(1.1)', // K-pop aesthetic for South Korea
    US: 'saturate(1.0)', // Original for US
    GB: 'saturate(1.0)', // Original for UK
    FR: 'saturate(0.95) brightness(1.05)', // Elegant for France
    MX: 'saturate(1.3) brightness(1.1)', // Vibrant for Mexico
  };

  // Text direction based on market
  const textDirection = marketCode === 'SA' ? 'rtl' : 'ltr';

  // Fade in animation
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Title animation
  const titleY = interpolate(frame, [0, 30], [-100, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000',
      }}
    >
      {/* Background Video Layer */}
      {hasVideo ? (
        <AbsoluteFill>
          <Video
            src={staticFile('sample-ad.mp4')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </AbsoluteFill>
      ) : (
        <AnimatedBackground marketCode={marketCode} />
      )}

      {/* Color Grading Filter Overlay */}
      <AbsoluteFill
        style={{
          filter: colorFilters[marketCode] || 'saturate(1.0)',
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
          opacity: 0.3,
        }}
      />

      {/* Cultural Overlay Effects */}
      <CulturalOverlay marketCode={marketCode} />

      {/* Market Title */}
      <Sequence from={0} durationInFrames={900}>
        <AbsoluteFill
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 60,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: 'white',
              opacity,
              transform: `translateY(${titleY}px)`,
              textAlign: 'center',
            }}
          >
            {marketName} Market Variant
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Main Content */}
      <Sequence from={60} durationInFrames={840}>
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 100,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              direction: textDirection,
              maxWidth: '80%',
              lineHeight: 1.4,
            }}
          >
            {originalText}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Modifications List */}
      <Sequence from={120} durationInFrames={780}>
        <AbsoluteFill
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            padding: 60,
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: 'white',
              opacity: 0.8,
            }}
          >
            <div style={{fontWeight: 'bold', marginBottom: 10}}>
              Cultural Adaptations:
            </div>
            {modifications.slice(0, 3).map((mod, i) => (
              <div key={i} style={{marginBottom: 5}}>
                ✓ {mod}
              </div>
            ))}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Market Code Badge */}
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '10px 20px',
            borderRadius: 10,
          }}
        >
          {marketCode}
        </div>
      </AbsoluteFill>
      
      {/* Audio Track */}
      <AudioTrack marketCode={marketCode} />
    </AbsoluteFill>
  );
};
