import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

const AnimatedLetter: React.FC<{ children: string; delay: number }> = ({ children, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 80 } });

  return (
    <span
      style={{
        display: "inline-block",
        opacity: progress,
        transform: `translateY(${(1 - progress) * 60}px) scale(${0.6 + progress * 0.4})`,
        filter: `blur(${(1 - progress) * 8}px)`,
      }}
    >
      {children}
    </span>
  );
};

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [10, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [25, 70], [0, 600], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(ellipse at 50% 35%, ${colors.primary}25 0%, transparent 55%),
          radial-gradient(ellipse at 50% 75%, ${colors.accent}15 0%, transparent 50%),
          ${colors.background}
        `,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 배경 원 */}
      {[...Array(4)].map((_, i) => {
        const size = 400 + i * 250;
        const opacity = interpolate(frame, [i * 6, i * 6 + 40], [0, 0.06]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              border: `2px solid ${colors.primary}`,
              opacity,
            }}
          />
        );
      })}

      {/* 상단 라인 */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          width: lineWidth,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
        }}
      />

      {/* 메인 타이틀 */}
      <div style={{ textAlign: "center", opacity: titleOpacity }}>
        <h1
          style={{
            fontFamily: fonts.script,
            fontSize: 160,
            fontWeight: 700,
            color: colors.textPrimary,
            margin: 0,
            letterSpacing: 12,
            textShadow: `0 0 100px ${colors.primary}70`,
          }}
        >
          {"그래프 성경".split("").map((char, i) => (
            <AnimatedLetter key={i} delay={10 + i * 5}>
              {char}
            </AnimatedLetter>
          ))}
        </h1>
      </div>

      {/* 영문 */}
      <div
        style={{
          opacity: interpolate(frame, [45, 70], [0, 1]),
          marginTop: 25,
        }}
      >
        <p
          style={{
            fontFamily: fonts.serif,
            fontSize: 50,
            color: colors.primary,
            margin: 0,
            letterSpacing: 25,
            textTransform: "uppercase",
          }}
        >
          Graph Bible
        </p>
      </div>

      {/* 하단 라인 */}
      <div
        style={{
          position: "absolute",
          top: "62%",
          width: lineWidth * 0.4,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
        }}
      />

      {/* 서브타이틀 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          textAlign: "center",
          opacity: subtitleOpacity,
        }}
      >
        <p
          style={{
            fontFamily: fonts.serif,
            fontSize: 56,
            color: colors.textSecondary,
            margin: 0,
          }}
        >
          성경 인물의 관계를
        </p>
        <p
          style={{
            fontFamily: fonts.script,
            fontSize: 90,
            color: colors.accent,
            margin: "25px 0 0 0",
          }}
        >
          한눈에
        </p>
      </div>
    </AbsoluteFill>
  );
};
