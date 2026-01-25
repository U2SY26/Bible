import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// 펼쳐진 성경책 SVG 아이콘
const bibleIconSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 배경 그라데이션 -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e"/>
      <stop offset="100%" style="stop-color:#16213e"/>
    </linearGradient>

    <!-- 책 그라데이션 -->
    <linearGradient id="bookGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#f5f5f5"/>
      <stop offset="100%" style="stop-color:#e0e0e0"/>
    </linearGradient>

    <!-- 금색 그라데이션 -->
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffd700"/>
      <stop offset="50%" style="stop-color:#ffec8b"/>
      <stop offset="100%" style="stop-color:#daa520"/>
    </linearGradient>

    <!-- 빛 효과 -->
    <radialGradient id="glowGradient" cx="50%" cy="30%" r="60%">
      <stop offset="0%" style="stop-color:#6c5ce7;stop-opacity:0.3"/>
      <stop offset="100%" style="stop-color:#6c5ce7;stop-opacity:0"/>
    </radialGradient>

    <!-- 그림자 -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="20" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- 배경 -->
  <rect width="1024" height="1024" rx="200" fill="url(#bgGradient)"/>

  <!-- 빛 효과 -->
  <ellipse cx="512" cy="350" rx="400" ry="300" fill="url(#glowGradient)"/>

  <!-- 펼쳐진 책 - 왼쪽 페이지 -->
  <g filter="url(#shadow)">
    <path d="M 512 280
             Q 480 290, 200 320
             L 200 720
             Q 480 700, 512 710
             L 512 280 Z"
          fill="url(#bookGradient)"
          stroke="#ccc"
          stroke-width="2"/>

    <!-- 왼쪽 페이지 텍스트 라인 -->
    <line x1="250" y1="380" x2="460" y2="370" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="250" y1="430" x2="470" y2="420" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="250" y1="480" x2="465" y2="470" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="250" y1="530" x2="475" y2="520" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="250" y1="580" x2="480" y2="570" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="250" y1="630" x2="485" y2="620" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
  </g>

  <!-- 펼쳐진 책 - 오른쪽 페이지 -->
  <g filter="url(#shadow)">
    <path d="M 512 280
             Q 544 290, 824 320
             L 824 720
             Q 544 700, 512 710
             L 512 280 Z"
          fill="url(#bookGradient)"
          stroke="#ccc"
          stroke-width="2"/>

    <!-- 오른쪽 페이지 텍스트 라인 -->
    <line x1="564" y1="370" x2="774" y2="380" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="554" y1="420" x2="774" y2="430" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="559" y1="470" x2="774" y2="480" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="549" y1="520" x2="774" y2="530" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="544" y1="570" x2="774" y2="580" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="539" y1="620" x2="774" y2="630" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
  </g>

  <!-- 책등 (중앙) -->
  <path d="M 502 270 L 522 270 L 522 720 L 502 720 Z"
        fill="#8b7355"
        stroke="#6b5344"
        stroke-width="2"/>

  <!-- 십자가 (금색) -->
  <g transform="translate(512, 200)">
    <!-- 세로 -->
    <rect x="-12" y="-60" width="24" height="120" rx="4" fill="url(#goldGradient)"/>
    <!-- 가로 -->
    <rect x="-40" y="-30" width="80" height="24" rx="4" fill="url(#goldGradient)"/>
  </g>

  <!-- 빛나는 효과 (십자가 주변) -->
  <g opacity="0.6">
    <line x1="512" y1="100" x2="512" y2="60" stroke="#ffd700" stroke-width="3" stroke-linecap="round"/>
    <line x1="550" y1="120" x2="580" y2="100" stroke="#ffd700" stroke-width="3" stroke-linecap="round"/>
    <line x1="474" y1="120" x2="444" y2="100" stroke="#ffd700" stroke-width="3" stroke-linecap="round"/>
    <line x1="560" y1="155" x2="590" y2="155" stroke="#ffd700" stroke-width="3" stroke-linecap="round"/>
    <line x1="464" y1="155" x2="434" y2="155" stroke="#ffd700" stroke-width="3" stroke-linecap="round"/>
  </g>

  <!-- 책 리본 (북마크) -->
  <path d="M 580 280 L 580 780 L 600 750 L 620 780 L 620 280"
        fill="#c0392b"
        stroke="#922b21"
        stroke-width="2"/>
</svg>
`;

// Foreground용 (배경 없는 버전)
const foregroundSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bookGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#f5f5f5"/>
      <stop offset="100%" style="stop-color:#e0e0e0"/>
    </linearGradient>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffd700"/>
      <stop offset="50%" style="stop-color:#ffec8b"/>
      <stop offset="100%" style="stop-color:#daa520"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#000" flood-opacity="0.2"/>
    </filter>
  </defs>

  <!-- 펼쳐진 책 - 왼쪽 페이지 -->
  <g filter="url(#shadow)">
    <path d="M 512 320
             Q 480 330, 220 360
             L 220 720
             Q 480 700, 512 710
             L 512 320 Z"
          fill="url(#bookGradient)"
          stroke="#ccc"
          stroke-width="2"/>
    <line x1="270" y1="420" x2="460" y2="410" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="270" y1="470" x2="470" y2="460" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="270" y1="520" x2="465" y2="510" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="270" y1="570" x2="475" y2="560" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="270" y1="620" x2="480" y2="610" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
  </g>

  <!-- 펼쳐진 책 - 오른쪽 페이지 -->
  <g filter="url(#shadow)">
    <path d="M 512 320
             Q 544 330, 804 360
             L 804 720
             Q 544 700, 512 710
             L 512 320 Z"
          fill="url(#bookGradient)"
          stroke="#ccc"
          stroke-width="2"/>
    <line x1="564" y1="410" x2="754" y2="420" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="554" y1="460" x2="754" y2="470" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="559" y1="510" x2="754" y2="520" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="549" y1="560" x2="754" y2="570" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
    <line x1="544" y1="610" x2="754" y2="620" stroke="#bbb" stroke-width="6" stroke-linecap="round"/>
  </g>

  <!-- 책등 -->
  <path d="M 502 310 L 522 310 L 522 720 L 502 720 Z"
        fill="#8b7355"
        stroke="#6b5344"
        stroke-width="2"/>

  <!-- 십자가 -->
  <g transform="translate(512, 240)">
    <rect x="-12" y="-60" width="24" height="110" rx="4" fill="url(#goldGradient)"/>
    <rect x="-38" y="-30" width="76" height="22" rx="4" fill="url(#goldGradient)"/>
  </g>

  <!-- 리본 -->
  <path d="M 580 320 L 580 760 L 598 735 L 616 760 L 616 320"
        fill="#c0392b"
        stroke="#922b21"
        stroke-width="2"/>
</svg>
`;

async function generateIcons() {
  const outputDir = '../flutter_app/assets/icon';

  // 디렉토리 확인
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Generating app icons...');

  // 메인 아이콘 (1024x1024)
  await sharp(Buffer.from(bibleIconSvg))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(outputDir, 'app_icon.png'));
  console.log('Created: app_icon.png (1024x1024)');

  // Foreground (Android Adaptive Icon)
  await sharp(Buffer.from(foregroundSvg))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(outputDir, 'app_icon_foreground.png'));
  console.log('Created: app_icon_foreground.png (1024x1024)');

  // 스플래시 로고 (512x512)
  await sharp(Buffer.from(foregroundSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(outputDir, 'splash_logo.png'));
  console.log('Created: splash_logo.png (512x512)');

  console.log('\nDone! Now run:');
  console.log('  cd ../flutter_app');
  console.log('  flutter pub run flutter_launcher_icons');
}

generateIcons().catch(console.error);
