import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors, fonts } from "../theme";

const verses = [
  { num: 1, text: "태초에 하나님이 천지를 창조하시니라" },
  { num: 2, text: "땅이 혼돈하고 공허하며 흑암이 깊음 위에 있고" },
  { num: 3, text: "하나님이 이르시되 빛이 있으라 하시니" },
  { num: 4, text: "빛이 있었고" },
];

export const BibleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const bookProgress = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 60 } });
  const pageFlip = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const getVerseProgress = (index: number) => {
    return spring({ frame: frame - 40 - index * 15, fps, config: { damping: 15, stiffness: 80 } });
  };

  const highlightProgress = interpolate(frame, [95, 115], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${colors.accentRed}15 0%, transparent 55%), ${colors.background}`,
      }}
    >
      {/* 타이틀 */}
      <div style={{ position: "absolute", top: 30, left: 0, right: 0, textAlign: "center", opacity: titleProgress }}>
        <h2 style={{ fontFamily: fonts.script, fontSize: 52, color: colors.textPrimary, margin: 0 }}>
          말씀을 읽다
        </h2>
      </div>

      {/* 성경 카드 - 전체 사용 */}
      <div style={{ position: "absolute", top: 100, left: 30, right: 30, bottom: 100 }}>
        {/* 헤더 */}
        <div
          style={{
            opacity: bookProgress,
            transform: `translateY(${(1 - bookProgress) * 20}px)`,
            marginBottom: 30,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderBottom: `3px solid ${colors.textSecondary}20`,
            paddingBottom: 20,
          }}
        >
          <div>
            <span style={{ fontFamily: fonts.serif, fontSize: 60, color: colors.textPrimary, fontWeight: 700 }}>
              창세기
            </span>
            <span style={{ fontFamily: fonts.serif, fontSize: 32, color: colors.textSecondary, marginLeft: 20, fontStyle: "italic" }}>
              Genesis
            </span>
          </div>
          <span style={{ fontFamily: fonts.script, fontSize: 48, color: colors.accentRed }}>
            제 1 장
          </span>
        </div>

        {/* 본문 - 크게 */}
        <div
          style={{
            background: `linear-gradient(180deg, ${colors.surface} 0%, ${colors.background} 100%)`,
            borderRadius: 28,
            padding: "55px 50px",
            border: `2px solid ${colors.textSecondary}15`,
            boxShadow: "0 30px 100px rgba(0,0,0,0.5)",
            opacity: pageFlip,
            transform: `perspective(1000px) rotateY(${(1 - pageFlip) * -8}deg)`,
            minHeight: 500,
          }}
        >
          {verses.map((verse, i) => {
            const progress = getVerseProgress(i);
            const isHighlighted = i === 2 && highlightProgress > 0;

            return (
              <div
                key={verse.num}
                style={{
                  marginBottom: 40,
                  opacity: progress,
                  transform: `translateX(${(1 - progress) * 50}px)`,
                  position: "relative",
                }}
              >
                {isHighlighted && (
                  <div
                    style={{
                      position: "absolute",
                      left: -20,
                      right: -20,
                      top: -12,
                      bottom: -12,
                      background: `linear-gradient(90deg, ${colors.accent}30, ${colors.accent}08)`,
                      borderRadius: 10,
                      opacity: highlightProgress,
                    }}
                  />
                )}
                <span
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: 32,
                    color: colors.accentRed,
                    fontWeight: 700,
                    marginRight: 18,
                    verticalAlign: "super",
                  }}
                >
                  {verse.num}
                </span>
                <span
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: 40,
                    color: colors.textPrimary,
                    lineHeight: 1.6,
                  }}
                >
                  {verse.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 하단 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [105, 130], [0, 1]),
        }}
      >
        <p style={{ fontFamily: fonts.serif, fontSize: 38, color: colors.textSecondary, margin: 0 }}>
          구약 <span style={{ color: colors.primary, fontWeight: 700, fontSize: 50 }}>39권</span>
          {"  ·  "}
          신약 <span style={{ color: colors.accentRed, fontWeight: 700, fontSize: 50 }}>27권</span>
        </p>
      </div>
    </AbsoluteFill>
  );
};
