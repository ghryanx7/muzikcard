# muzikcard

Generate stylish music card images with multiple visual themes using Node.js.

## Features

- Title, Artist, Album Art thumbnail
- Progress bar showing playback
- Three themes: Classic, Modern, Minimal

## Installation

```bash
npm install muzikcard

## Usage

const generateCard = require("muzikcard");

const song = {
  title: "Blinding Lights",
  artist: "The Weeknd",
  albumArt: "https://link-to-image.jpg",
  duration: 200,
  currentTime: 60
};

generateCard(song, { type: "classic" })
  .then(buffer => {
    require('fs').writeFileSync('card.png', buffer);
  });