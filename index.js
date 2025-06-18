const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

const images = {
  wttt: [
    "https://raw.githubusercontent.com/WELCOMETOTHETRIBE/wttt-assets/main/bg-library/tribal1.jpg",
    "https://raw.githubusercontent.com/WELCOMETOTHETRIBE/wttt-assets/main/bg-library/nature2.jpg"
  ],
  jabroni: [
    "https://raw.githubusercontent.com/WELCOMETOTHETRIBE/jabronis-assets/main/fire-textures/smoky.jpg"
  ],
  denly: [
    "https://raw.githubusercontent.com/WELCOMETOTHETRIBE/denly-assets/main/branding-snaps/sign1.jpg"
  ]
};

const quotes = {
  wttt: [
    "Heal yourself, heal the tribe.",
    "Ancient roots, modern rituals."
  ],
  jabroni: [
    "We don’t just serve heat. We are heat.",
    "This ain’t no vegan picnic."
  ],
  denly: [
    "From our table to yours since 1933.",
    "If you know, you know — and if you don’t, now you do."
  ]
};

const moods = {
  wttt: "🌀 Ancestral",
  jabroni: "🔥 Intense",
  denly: "🍕 Classic"
};

// ✅ /notion-payload — for Notion integration
app.get('/notion-payload', (req, res) => {
  const brand = req.query.brand || 'wttt';
  const selectedImages = images[brand] || images['wttt'];
  const selectedQuotes = quotes[brand] || quotes['wttt'];
  const selectedMood = moods[brand] || "🌀 Vibe";

  const image = selectedImages[Math.floor(Math.random() * selectedImages.length)];
  const quote = selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)];
  const mood = selectedMood;

  res.json({
    title: `Daily Creative — ${brand.toUpperCase()}`,
    image,
    quote,
    mood
  });
});

// Optional: homepage fallback
app.get('/', (req, res) => {
  res.send('🚀 TRIBECORE ASSETS API is live.');
});

app.listen(port, () => {
  console.log(`TRIBECORE server running on ${port}`);
});

