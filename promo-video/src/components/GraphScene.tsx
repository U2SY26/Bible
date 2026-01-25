import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { colors, fonts } from "../theme";

// 노드 배치 - 작게 조정
const characters = [
  { id: "god", name: "하나님", x: 50, y: 8, size: 80, color: colors.accent },
  { id: "abraham", name: "아브라함", x: 12, y: 22, size: 65, color: colors.primary },
  { id: "moses", name: "모세", x: 88, y: 22, size: 65, color: colors.primary },
  { id: "david", name: "다윗", x: 18, y: 42, size: 60, color: colors.primaryLight },
  { id: "isaiah", name: "이사야", x: 82, y: 42, size: 58, color: colors.primaryLight },
  { id: "jesus", name: "예수", x: 50, y: 55, size: 75, color: colors.accentRed },
  { id: "peter", name: "베드로", x: 20, y: 72, size: 55, color: colors.holySpirit },
  { id: "paul", name: "바울", x: 80, y: 72, size: 55, color: colors.holySpirit },
];

const connections = [
  ["god", "abraham"], ["god", "moses"], ["god", "jesus"],
  ["abraham", "david"], ["moses", "isaiah"],
  ["david", "jesus"], ["isaiah", "jesus"],
  ["jesus", "peter"], ["jesus", "paul"],
];

export const GraphScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });

  const getNodeProgress = (index: number) => {
    return spring({
      frame: frame - 20 - index * 8,
      fps,
      config: { damping: 12, stiffness: 60 },
    });
  };

  const getLineProgress = (index: number) => {
    return interpolate(frame, [40 + index * 6, 65 + index * 6], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  };

  const highlightIndex = Math.floor((frame - 90) / 15) % characters.length;

  const counterOpacity = interpolate(frame, [130, 160], [0, 1]);
  const charCount = Math.floor(interpolate(frame, [130, 180], [0, 600], { extrapolateRight: "clamp" }));
  const relCount = Math.floor(interpolate(frame, [140, 185], [0, 350], { extrapolateRight: "clamp" }));

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 45%, ${colors.primary}15 0%, transparent 70%), ${colors.background}`,
      }}
    >
      {/* 타이틀 - 작게 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleProgress,
        }}
      >
        <h2 style={{ fontFamily: fonts.script, fontSize: 52, color: colors.textPrimary, margin: 0 }}>
          인물 관계도
        </h2>
      </div>

      {/* 그래프 - 왼쪽 영역 (더 작게) */}
      <div style={{ position: "absolute", top: 100, left: 30, width: 420, bottom: 180 }}>
        {/* 연결선 */}
        <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
              <stop offset="100%" stopColor={colors.accent} stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {connections.map((conn, i) => {
            const from = characters.find((c) => c.id === conn[0])!;
            const to = characters.find((c) => c.id === conn[1])!;
            const p = getLineProgress(i);
            return (
              <line
                key={i}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${from.x + (to.x - from.x) * p}%`}
                y2={`${from.y + (to.y - from.y) * p}%`}
                stroke="url(#lineGrad)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            );
          })}
        </svg>

        {/* 노드 */}
        {characters.map((char, i) => {
          const progress = getNodeProgress(i);
          const isActive = frame > 90 && i === highlightIndex;

          return (
            <div
              key={char.id}
              style={{
                position: "absolute",
                left: `${char.x}%`,
                top: `${char.y}%`,
                transform: `translate(-50%, -50%) scale(${progress * (isActive ? 1.12 : 1)})`,
                opacity: progress,
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    width: char.size + 40,
                    height: char.size + 40,
                    left: -20,
                    top: -20,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${char.color}60 0%, transparent 70%)`,
                  }}
                />
              )}
              <div
                style={{
                  width: char.size,
                  height: char.size,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${char.color}35 0%, ${colors.surface} 100%)`,
                  border: `3px solid ${char.color}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: isActive
                    ? `0 0 30px ${char.color}80`
                    : `0 8px 30px rgba(0,0,0,0.5)`,
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.script,
                    fontSize: char.size * 0.32,
                    color: colors.textPrimary,
                    fontWeight: 700,
                  }}
                >
                  {char.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 앱 데모 영상 - 폰 프레임 (더 크게) */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: "45%",
          transform: `translateY(-50%) scale(${interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
          opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        {/* 폰 프레임 */}
        <div
          style={{
            width: 320,
            height: 640,
            borderRadius: 48,
            background: `linear-gradient(145deg, #2a2a3a 0%, #1a1a2a 100%)`,
            padding: 10,
            boxShadow: `0 30px 100px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.1)`,
          }}
        >
          {/* 스크린 */}
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 38,
              overflow: "hidden",
              background: colors.background,
            }}
          >
            <Video
              src={staticFile("app-demo.mp4")}
              playbackRate={2.5}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        {/* 라벨 */}
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            fontFamily: fonts.script,
            fontSize: 36,
            color: colors.textSecondary,
          }}
        >
          실시간 탐색
        </div>
      </div>

      {/* 통계 - 하단에 꽉 차게 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          right: 40,
          display: "flex",
          justifyContent: "space-around",
          opacity: counterOpacity,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: fonts.serif, fontSize: 100, fontWeight: 700, color: colors.accent, lineHeight: 1 }}>
            {charCount}<span style={{ fontSize: 60, color: colors.textSecondary }}>+</span>
          </div>
          <div style={{ fontFamily: fonts.script, fontSize: 42, color: colors.textSecondary }}>인물</div>
        </div>
        <div style={{ width: 3, background: `${colors.textSecondary}30`, alignSelf: "stretch", margin: "20px 0" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: fonts.serif, fontSize: 100, fontWeight: 700, color: colors.primary, lineHeight: 1 }}>
            {relCount}<span style={{ fontSize: 60, color: colors.textSecondary }}>+</span>
          </div>
          <div style={{ fontFamily: fonts.script, fontSize: 42, color: colors.textSecondary }}>관계</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
