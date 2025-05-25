const themes = require('./themes');

async function generateMusicCard(song, options = {}) {
  const type = options.type || 'classic';
  const theme = themes[type];
  if (!theme) throw new Error(`Card type "${type}" not supported`);
  return await theme.generate(song);
}

module.exports = generateMusicCard;
