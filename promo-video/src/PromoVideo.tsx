import { AbsoluteFill, Sequence, continueRender, delayRender } from "remotion";
import { useEffect, useState } from "react";
import { IntroScene } from "./components/IntroScene";
import { GraphScene } from "./components/GraphScene";
import { TimelineScene } from "./components/TimelineScene";
import { BibleScene } from "./components/BibleScene";
import { FeaturesScene } from "./components/FeaturesScene";
import { OutroScene } from "./components/OutroScene";
import { colors } from "./theme";

interface PromoVideoProps {
  horizontal?: boolean;
}

export const PromoVideo: React.FC<PromoVideoProps> = ({ horizontal = false }) => {
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    const fontUrls = [
      "https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700;900&display=swap",
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap",
      "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap",
      "https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap",
    ];

    Promise.all(
      fontUrls.map((font) => {
        const link = document.createElement("link");
        link.href = font;
        link.rel = "stylesheet";
        document.head.appendChild(link);
        return new Promise((resolve) => setTimeout(resolve, 100));
      })
    ).then(() => {
      setTimeout(() => continueRender(handle), 500);
    });
  }, [handle]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* 인트로: 0-5초 (0-150프레임) */}
      <Sequence from={0} durationInFrames={150}>
        <IntroScene />
      </Sequence>

      {/* 그래프 기능: 5-12초 (150-360프레임) */}
      <Sequence from={150} durationInFrames={210}>
        <GraphScene />
      </Sequence>

      {/* 타임라인: 12-17초 (360-510프레임) */}
      <Sequence from={360} durationInFrames={150}>
        <TimelineScene />
      </Sequence>

      {/* 성경 읽기: 17-22초 (510-660프레임) */}
      <Sequence from={510} durationInFrames={150}>
        <BibleScene />
      </Sequence>

      {/* 기능 소개: 22-26초 (660-780프레임) */}
      <Sequence from={660} durationInFrames={120}>
        <FeaturesScene />
      </Sequence>

      {/* 아웃트로: 26-30초 (780-900프레임) */}
      <Sequence from={780} durationInFrames={120}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
