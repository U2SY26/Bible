// Generate app icons for Flutter app
// Run: node scripts/generate-icons.mjs

import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const outputDir = '../flutter_app/assets/icon';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Color scheme
const colors = {
  background: '#1a1a2e',
  backgroundDark: '#0a0a0f',
  primary: '#00d4ff',
  gold: '#d4af37',
  white: '#ffffff'
};

// Generate main app icon (1024x1024)
function generateAppIcon() {
  const size = 1024;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, colors.background);
  gradient.addColorStop(1, colors.backgroundDark);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Draw network nodes and edges
  const nodes = [
    { x: 512, y: 350, r: 80, color: colors.primary },
    { x: 300, y: 500, r: 50, color: colors.gold },
    { x: 724, y: 500, r: 50, color: '#ff6b6b' },
    { x: 400, y: 700, r: 40, color: '#4ecdc4' },
    { x: 624, y: 700, r: 40, color: '#a855f7' },
  ];

  // Draw edges
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 4;

  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 4], [0, 3], [0, 4], [3, 4]
  ];

  for (const [i, j] of edges) {
    ctx.beginPath();
    ctx.moveTo(nodes[i].x, nodes[i].y);
    ctx.lineTo(nodes[j].x, nodes[j].y);
    ctx.stroke();
  }

  // Draw nodes with glow
  for (const node of nodes) {
    // Glow
    const glowGradient = ctx.createRadialGradient(
      node.x, node.y, 0,
      node.x, node.y, node.r * 1.5
    );
    glowGradient.addColorStop(0, node.color + '80');
    glowGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Node
    ctx.fillStyle = node.color;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fill();

    // Border
    ctx.strokeStyle = colors.white;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // Add text "GB" (Graph Bible) on main node
  ctx.fillStyle = colors.white;
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GB', 512, 350);

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, 'app_icon.png'), buffer);
  console.log('Generated: app_icon.png');
}

// Generate foreground icon for adaptive icons (1024x1024 with safe zone)
function generateForegroundIcon() {
  const size = 1024;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Transparent background
  ctx.clearRect(0, 0, size, size);

  // Safe zone is center 66% (about 340-684)
  const centerX = 512;
  const centerY = 512;

  // Draw network nodes and edges (scaled down for safe zone)
  const nodes = [
    { x: centerX, y: centerY - 80, r: 60, color: colors.primary },
    { x: centerX - 120, y: centerY + 50, r: 40, color: colors.gold },
    { x: centerX + 120, y: centerY + 50, r: 40, color: '#ff6b6b' },
    { x: centerX - 60, y: centerY + 150, r: 30, color: '#4ecdc4' },
    { x: centerX + 60, y: centerY + 150, r: 30, color: '#a855f7' },
  ];

  // Draw edges
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 3;

  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 4], [0, 3], [0, 4], [3, 4]
  ];

  for (const [i, j] of edges) {
    ctx.beginPath();
    ctx.moveTo(nodes[i].x, nodes[i].y);
    ctx.lineTo(nodes[j].x, nodes[j].y);
    ctx.stroke();
  }

  // Draw nodes
  for (const node of nodes) {
    ctx.fillStyle = node.color;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = colors.white;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Add text
  ctx.fillStyle = colors.white;
  ctx.font = 'bold 45px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GB', centerX, centerY - 80);

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, 'app_icon_foreground.png'), buffer);
  console.log('Generated: app_icon_foreground.png');
}

// Generate splash logo (smaller, centered)
function generateSplashLogo() {
  const size = 512;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Transparent background
  ctx.clearRect(0, 0, size, size);

  const centerX = 256;
  const centerY = 200;

  // Draw simplified network
  const nodes = [
    { x: centerX, y: centerY, r: 40, color: colors.primary },
    { x: centerX - 80, y: centerY + 60, r: 25, color: colors.gold },
    { x: centerX + 80, y: centerY + 60, r: 25, color: '#ff6b6b' },
  ];

  // Draw edges
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 2;

  for (let i = 1; i < nodes.length; i++) {
    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);
    ctx.lineTo(nodes[i].x, nodes[i].y);
    ctx.stroke();
  }

  // Draw nodes
  for (const node of nodes) {
    ctx.fillStyle = node.color;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Add app name
  ctx.fillStyle = colors.white;
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('그래프 성경', centerX, 340);

  ctx.fillStyle = colors.gold;
  ctx.font = '24px Arial';
  ctx.fillText('Graph Bible', centerX, 380);

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, 'splash_logo.png'), buffer);
  console.log('Generated: splash_logo.png');
}

// Run all generators
console.log('Generating app icons...');
generateAppIcon();
generateForegroundIcon();
generateSplashLogo();
console.log('Done!');
