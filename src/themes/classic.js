const { createCanvas, loadImage } = require('canvas');

exports.generate = async function(song) {
  const width = 600;
  const height = 200;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, width, height);

  // Album Art
  const albumImage = await loadImage(song.albumArt);
  ctx.drawImage(albumImage, 20, 20, 160, 160);

  // Text
  ctx.fillStyle = '#111';
  ctx.font = 'bold 24px Arial';
  ctx.fillText(song.title, 200, 60);
  ctx.font = '18px Arial';
  ctx.fillText(song.artist, 200, 100);

  // Progress bar
  const barX = 200;
  const barY = 140;
  const barWidth = 360;
  const barHeight = 10;

  const progress = Math.min(song.currentTime / song.duration, 1);
  const progressWidth = barWidth * progress;

  // Background bar
  ctx.fillStyle = '#ccc';
  ctx.fillRect(barX, barY, barWidth, barHeight);

  // Progress bar
  ctx.fillStyle = '#007bff';
  ctx.fillRect(barX, barY, progressWidth, barHeight);

  return canvas.toBuffer('image/png');
};
