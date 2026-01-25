import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

const features = [
  { title: "빠른 검색", desc: "인물 · 사건 · 장소를 즉시 찾기" },
  { title: "다크 모드", desc: "밤에도 편안한 읽기 경험" },
  { title: "이중 언어", desc: "한국어와 English 자유 전환" },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });

  const getFeatureProgress = (index: number) => {
    return spring({ frame: frame - 15 - index * 15, fps, config: { damping: 12, stiffness: 60 } });
  };

  const activeIndex = Math.floor(interpolate(frame, [25, 95], [0, 2.9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${colors.holySpirit}15 0%, transparent 60%), ${colors.background}`,
      }}
    >
      {/* 타이틀 */}
      <div style={{ position: "absolute", top: 40, left: 0, right: 0, textAlign: "center", opacity: titleProgress }}>
        <h2 style={{ fontFamily: fonts.script, fontSize: 56, color: colors.textPrimary, margin: 0 }}>
          더 많은 기능
        </h2>
      </div>

      {/* 기능 카드 - 화면 채우기 */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 35,
          right: 35,
          bottom: 100,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {features.map((feature, i) => {
          const progress = getFeatureProgress(i);
          const isActive = i === activeIndex;

          return (
            <div
              key={feature.title}
              style={{
                opacity: progress,
                transform: `translateX(${(1 - progress) * 100}px) scale(${isActive ? 1.02 : 1})`,
              }}
            >
              <div
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${colors.surface} 0%, ${colors.primary}20 100%)`
                    : colors.surface,
                  borderRadius: 32,
                  padding: "60px 60px",
                  border: isActive ? `3px solid ${colors.primary}70` : `2px solid ${colors.textSecondary}15`,
                  boxShadow: isActive ? `0 30px 80px ${colors.primary}25` : "0 15px 50px rgba(0,0,0,0.3)",
                }}
              >
                <h3
                  style={{
                    fontFamily: fonts.script,
                    fontSize: 64,
                    color: isActive ? colors.textPrimary : colors.textSecondary,
                    margin: 0,
                    marginBottom: 18,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: 34,
                    color: isActive ? colors.accent : colors.textSecondary,
                    margin: 0,
                    letterSpacing: 2,
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 하단 */}
      <div
        style={{
          position: "absolute",
          bottom: 35,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 80,
          opacity: interpolate(frame, [75, 100], [0, 1]),
        }}
      >
        {["간편함", "아름다움", "깊이"].map((word, i) => (
          <span
            key={word}
            style={{
              fontFamily: fonts.script,
              fontSize: 44,
              color: i === 1 ? colors.accent : colors.textSecondary,
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
