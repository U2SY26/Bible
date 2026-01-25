import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

const eras = [
  { name: "창조", year: "태초" },
  { name: "족장", year: "BC 2000" },
  { name: "출애굽", year: "BC 1446" },
  { name: "왕국", year: "BC 1050" },
  { name: "포로", year: "BC 586" },
  { name: "신약", year: "AD 1" },
];

export const TimelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const lineHeight = interpolate(frame, [25, 110], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const getEraProgress = (index: number) => {
    return spring({ frame: frame - 20 - index * 10, fps, config: { damping: 12, stiffness: 70 } });
  };

  const activeEra = Math.floor(interpolate(frame, [35, 125], [0, eras.length - 0.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(ellipse at 25% 35%, ${colors.accent}12 0%, transparent 50%),
          radial-gradient(ellipse at 75% 65%, ${colors.primary}12 0%, transparent 50%),
          ${colors.background}
        `,
      }}
    >
      {/* 타이틀 */}
      <div style={{ position: "absolute", top: 30, left: 0, right: 0, textAlign: "center", opacity: titleProgress }}>
        <h2 style={{ fontFamily: fonts.script, fontSize: 52, color: colors.textPrimary, margin: 0 }}>
          시대별 여정
        </h2>
      </div>

      {/* 타임라인 - 전체 높이 사용 */}
      <div style={{ position: "absolute", top: 100, left: 50, right: 50, bottom: 80 }}>
        {/* 중앙선 */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: 4,
            height: `${lineHeight}%`,
            background: `linear-gradient(to bottom, ${colors.accent}, ${colors.primary})`,
            transform: "translateX(-50%)",
          }}
        />

        {/* 시대 카드 */}
        {eras.map((era, i) => {
          const progress = getEraProgress(i);
          const isActive = i === activeEra;
          const isLeft = i % 2 === 0;

          return (
            <div
              key={era.name}
              style={{
                position: "absolute",
                top: `${(i / (eras.length - 1)) * 90}%`,
                left: isLeft ? 0 : "50%",
                right: isLeft ? "50%" : 0,
                paddingLeft: isLeft ? 0 : 45,
                paddingRight: isLeft ? 45 : 0,
                opacity: progress,
                transform: `translateX(${(1 - progress) * (isLeft ? -50 : 50)}px)`,
              }}
            >
              {/* 연결점 */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  [isLeft ? "right" : "left"]: -14,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: isActive
                    ? `radial-gradient(circle, ${colors.accent} 0%, ${colors.primary} 100%)`
                    : colors.surface,
                  border: `4px solid ${isActive ? colors.accent : colors.textSecondary}`,
                  transform: "translateY(-50%)",
                  boxShadow: isActive ? `0 0 40px ${colors.accent}90` : "none",
                }}
              />

              {/* 카드 */}
              <div
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${colors.surface} 0%, ${colors.primary}25 100%)`
                    : colors.surface,
                  borderRadius: 24,
                  padding: "35px 45px",
                  border: isActive ? `3px solid ${colors.primary}80` : `2px solid ${colors.textSecondary}20`,
                  boxShadow: isActive ? `0 20px 60px ${colors.primary}35` : "0 10px 40px rgba(0,0,0,0.35)",
                  textAlign: isLeft ? "right" : "left",
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.script,
                    fontSize: 54,
                    color: isActive ? colors.textPrimary : colors.textSecondary,
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {era.name}
                </div>
                <div
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: 28,
                    color: isActive ? colors.accent : colors.textSecondary,
                    letterSpacing: 3,
                  }}
                >
                  {era.year}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 하단 */}
      <div
        style={{
          position: "absolute",
          bottom: 25,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [95, 125], [0, 1]),
        }}
      >
        <p style={{ fontFamily: fonts.serif, fontSize: 42, color: colors.textSecondary, margin: 0 }}>
          성경의 <span style={{ fontFamily: fonts.script, fontSize: 56, color: colors.accent }}>흐름</span>을 따라가다
        </p>
      </div>
    </AbsoluteFill>
  );
};
