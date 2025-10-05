import {Composition} from 'remotion';
import {MarketVariant} from './MarketVariant';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MarketVariant"
        component={MarketVariant}
        durationInFrames={900} // 30 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          marketCode: 'JP',
          marketName: 'Japan',
          modifications: [],
          originalText: 'You can\'t stop us. Together we rise.',
        }}
      />
    </>
  );
};
