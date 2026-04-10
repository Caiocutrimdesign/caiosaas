import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";
import { Scene1Logo } from "./scenes/Scene1Logo";
import { Scene2Hero } from "./scenes/Scene2Hero";
import { Scene3Services } from "./scenes/Scene3Services";
import { Scene4Differentials } from "./scenes/Scene4Differentials";
import { Scene5Clients } from "./scenes/Scene5Clients";
import { Scene6Contact } from "./scenes/Scene6Contact";
import { Scene7Closing } from "./scenes/Scene7Closing";

const T = 20;
const timing = springTiming({ config: { damping: 200 }, durationInFrames: T });

export const MainVideo = () => {
  const frame = useCurrentFrame();
  // Subtle animated gradient background
  const hue = interpolate(frame, [0, 1230], [210, 220]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A2540" }}>
      {/* Persistent subtle gradient */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 30% 40%, rgba(245,176,65,0.08) 0%, transparent 60%)`,
        }}
      />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene1Logo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={210}>
          <Scene2Hero />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={360}>
          <Scene3Services />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={240}>
          <Scene4Differentials />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={150}>
          <Scene5Clients />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={150}>
          <Scene6Contact />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene7Closing />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
