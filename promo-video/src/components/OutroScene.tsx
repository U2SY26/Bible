import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const titleProgress = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 60 } });
  const ctaProgress = spring({ frame: frame - 30, fps, config: { damping: 15, stiffness: 100 } });

  const glowPulse = 0.4 + Math.sin(frame * 0.15) * 0.6;
  const circleScale = interpolate(frame, [0, 120], [0.5, 1.6]);

  return (
    <AbsoluteFill
      style={{
        background: colors.background,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 배경 글로우 */}
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 1200,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.primary}30 0%, transparent 60%)`,
          transform: `scale(${circleScale})`,
          opacity: glowPulse,
        }}
      />

      {/* 장식 원 */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 600 + i * 300,
            height: 600 + i * 300,
            borderRadius: "50%",
            border: `2px solid ${colors.primary}${30 - i * 10}`,
            opacity: logoProgress * (0.5 - i * 0.15),
          }}
        />
      ))}

      {/* 콘텐츠 */}
      <div style={{ textAlign: "center", zIndex: 1 }}>
        {/* 앱 이름 */}
        <div
          style={{
            opacity: logoProgress,
            transform: `translateY(${(1 - logoProgress) * 60}px)`,
          }}
        >
          <h1
            style={{
              fontFamily: fonts.script,
              fontSize: 140,
              color: colors.textPrimary,
              margin: 0,
              textShadow: `0 0 120px ${colors.primary}60`,
            }}
          >
            그래프 성경
          </h1>
        </div>

        {/* 영문 */}
        <div
          style={{
            opacity: titleProgress,
            transform: `translateY(${(1 - titleProgress) * 30}px)`,
            marginTop: 20,
          }}
        >
          <p
            style={{
              fontFamily: fonts.serif,
              fontSize: 44,
              color: colors.primary,
              margin: 0,
              letterSpacing: 20,
              textTransform: "uppercase",
            }}
          >
            Graph Bible
          </p>
        </div>

        {/* 구분선 */}
        <div
          style={{
            width: interpolate(frame, [12, 40], [0, 250]),
            height: 3,
            background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
            margin: "55px auto",
          }}
        />

        {/* 태그라인 */}
        <div style={{ opacity: titleProgress, marginBottom: 70 }}>
          <p style={{ fontFamily: fonts.serif, fontSize: 46, color: colors.textSecondary, margin: 0 }}>
            성경 인물의 관계를
          </p>
          <p style={{ fontFamily: fonts.script, fontSize: 70, color: colors.accent, margin: "20px 0 0 0" }}>
            한눈에 파악하세요
          </p>
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: ctaProgress,
            transform: `translateY(${(1 - ctaProgress) * 50}px) scale(${ctaProgress})`,
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "40px 100px",
              borderRadius: 60,
              background: `linear-gradient(135deg, ${colors.accent} 0%, #FFA500 100%)`,
              boxShadow: `0 25px 80px ${colors.accent}60`,
            }}
          >
            <span
              style={{
                fontFamily: fonts.serif,
                fontSize: 44,
                fontWeight: 700,
                color: colors.background,
                letterSpacing: 5,
              }}
            >
              지금 다운로드
            </span>
          </div>
        </div>

        {/* 스토어 */}
        <div style={{ opacity: interpolate(frame, [55, 85], [0, 1]), marginTop: 55 }}>
          <p
            style={{
              fontFamily: fonts.serif,
              fontSize: 32,
              color: colors.textSecondary,
              margin: 0,
              letterSpacing: 8,
            }}
          >
            App Store · Google Play
          </p>
        </div>
      </div>

      {/* 저작권 */}
      <div style={{ position: "absolute", bottom: 40, opacity: interpolate(frame, [75, 100], [0, 0.7]) }}>
        <p style={{ fontFamily: fonts.serif, fontSize: 22, color: colors.textSecondary, margin: 0, letterSpacing: 4 }}>
          © 2024 Graph Bible
        </p>
      </div>
    </AbsoluteFill>
  );
};
