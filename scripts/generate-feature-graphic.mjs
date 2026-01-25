import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

const WIDTH = 1024;
const HEIGHT = 500;

async function generateFeatureGraphic() {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background gradient (dark theme matching the app)
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, '#0a0a0f');
  gradient.addColorStop(0.5, '#1a1a2e');
  gradient.addColorStop(1, '#0f0f1a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Add subtle pattern/decoration
  ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.arc(WIDTH * 0.2, HEIGHT * 0.5, 50 + i * 30, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Load and draw the icon
  try {
    const icon = await loadImage(path.join(process.cwd(), '..', 'icon.png'));
    const iconSize = 280;
    const iconX = 80;
    const iconY = (HEIGHT - iconSize) / 2;

    // Draw icon with rounded corners effect
    ctx.save();
    ctx.beginPath();
    const radius = 40;
    ctx.roundRect(iconX, iconY, iconSize, iconSize, radius);
    ctx.clip();
    ctx.drawImage(icon, iconX, iconY, iconSize, iconSize);
    ctx.restore();

    // Add subtle shadow/glow around icon
    ctx.shadowColor = 'rgba(99, 102, 241, 0.3)';
    ctx.shadowBlur = 30;
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(iconX, iconY, iconSize, iconSize, radius);
    ctx.stroke();
    ctx.shadowBlur = 0;
  } catch (e) {
    console.log('Icon not found, continuing without it');
  }

  // App name - Korean
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px "Noto Sans KR", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('그래프 성경', 400, 200);

  // Tagline
  ctx.fillStyle = '#a5b4fc';
  ctx.font = '32px "Noto Sans KR", sans-serif';
  ctx.fillText('성경 인물 관계를 시각적으로 탐험하세요', 400, 260);

  // Features
  ctx.fillStyle = '#9ca3af';
  ctx.font = '24px "Noto Sans KR", sans-serif';
  const features = ['600+ 인물', '350+ 관계', '타임라인', '성경 전문'];
  let featureX = 400;
  features.forEach((feature, i) => {
    // Feature pill background
    const textWidth = ctx.measureText(feature).width;
    ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
    ctx.beginPath();
    ctx.roundRect(featureX, 300, textWidth + 30, 40, 20);
    ctx.fill();

    // Feature text
    ctx.fillStyle = '#c7d2fe';
    ctx.fillText(feature, featureX + 15, 328);
    featureX += textWidth + 50;
  });

  // Decorative elements on the right
  ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
  ctx.beginPath();
  ctx.arc(WIDTH + 50, HEIGHT / 2, 200, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(168, 85, 247, 0.1)';
  ctx.beginPath();
  ctx.arc(WIDTH - 100, HEIGHT - 50, 150, 0, Math.PI * 2);
  ctx.fill();

  // Save the image
  const outputDir = path.join(process.cwd(), '..', 'flutter_app', 'store_assets', 'graphics');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const buffer = canvas.toBuffer('image/png');
  const outputPath = path.join(outputDir, 'feature_graphic.png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Feature graphic saved to: ${outputPath}`);

  // Also save a copy in the root for easy access
  const rootOutputPath = path.join(process.cwd(), '..', 'feature_graphic.png');
  fs.writeFileSync(rootOutputPath, buffer);
  console.log(`Copy saved to: ${rootOutputPath}`);
}

generateFeatureGraphic().catch(console.error);
