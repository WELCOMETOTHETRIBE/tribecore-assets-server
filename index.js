const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

// ✅ Serve frontend static files (Vite or CRA build output)
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// ✅ API: Brand-specific image URLs
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

// ✅ API: Brand-specific quotes
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

// 🧠 Mood mapping
const moods = {
  wttt: "🌀 Ancestral",
  jabroni: "🔥 Bold",
  denly: "🍕 Nostalgic"
};

// 🎯 API: Get random image
app.get('/random', (req, res) => {
  const brand = req.query.brand || 'wttt';
  const selected = images[brand] || images['wttt'];
  const image = selected[Math.floor(Math.random() * selected.length)];
  res.json({ brand, image });
});

// 💬 API: Get random quote
app.get('/quote', (req, res) => {
  const brand = req.query.brand || 'wttt';
  const selected = quotes[brand] || quotes['wttt'];
  const quote = selected[Math.floor(Math.random() * selected.length)];
  res.json({ brand, quote });
});

// 📦 API: Combined payload for Zapier / Notion / Dashboards
app.get('/notion-payload', (req, res) => {
  const brand = req.query.brand || 'wttt';
  const selectedImages = images[brand] || images['wttt'];
  const selectedQuotes = quotes[brand] || quotes['wttt'];

  const image = selectedImages[Math.floor(Math.random() * selectedImages.length)];
  const quote = selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)];

  res.json({
    title: `Daily Creative — ${brand.toUpperCase()}`,
    brand,
    image,
    quote,
    mood: moods[brand] || "✨ Creative"
  });
});

// ✅ Health check
app.get('/health', (req, res) => {
  res.send("✅ TRIBECORE server is up and running!");
});

// 🪄 Fallback: Serve index.html for any route not handled above (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// 🚀 Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`TRIBECORE server running on port ${port}`);
});

