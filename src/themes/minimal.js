const { createCanvas, loadImage } = require('canvas');

exports.generate = async function(song) {
  const width = 600;
  const height = 200;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, width, height);

  // Album Art with rounded corners
  const albumImage = await loadImage(song.albumArt);
  const radius = 20;
  const x = 20;
  const y = 20;
  const w = 160;
  const h = 160;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(albumImage, x, y, w, h);
  ctx.restore();

  // Text
  ctx.fillStyle = '#000';
  ctx.font = 'bold 24px Arial';
  ctx.fillText(song.title, 200, 70);
  ctx.font = '18px Arial';
  ctx.fillStyle = '#555';
  ctx.fillText(song.artist, 200, 110);

  // Progress bar
  const barX = 200;
  const barY = 150;
  const barWidth = 360;
  const barHeight = 6;

  const progress = Math.min(song.currentTime / song.duration, 1);
  const progressWidth = barWidth * progress;

  // Background bar
  ctx.fillStyle = '#ddd';
  ctx.fillRect(barX, barY, barWidth, barHeight);

  // Progress bar
  ctx.fillStyle = '#000';
  ctx.fillRect(barX, barY, progressWidth, barHeight);

  return canvas.toBuffer('image/png');
};