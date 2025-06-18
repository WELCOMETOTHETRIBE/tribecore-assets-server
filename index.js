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
  wttt: ["🌿 Holistic", "🌀 Ancestral", "✨ Spiritual"],
  jabroni: ["🔥 Smoky", "🍖 Mafia BBQ", "🧄 Bold"],
  denly: ["🍝 Nostalgic", "🍷 Family", "🇮🇹 Italian-American"]
};

const brandMap = {
  wttt: "WELCOME TO THE TRIBE",
  jabroni: "Jabroni’s Wood Fired",
  denly: "Denly Gardens"
};

// Root endpoint with usage instructions
app.get('/', (req, res) => {
  res.send(`
    <h1>👋 Welcome to the TRIBECORE Assets Server</h1>
    <p>Try one of the following endpoints:</p>
    <ul>
      <li><a href="/random?brand=wttt">/random?brand=wttt</a></li>
      <li><a href="/quote?brand=jabroni">/quote?brand=jabroni</a></li>
      <li><a href="/background?brand=denly">/background?brand=denly</a></li>
      <li><a href="/notion-payload?brand=wttt">/notion-payload?brand=wttt</a></li>
    </ul>
  `);
});

// Serve a random image
app.get('/random', (req, res) => {
  const brand = req.query.brand?.toLowerCase() || 'wttt';
  const selected = images[brand] || images['wttt'];
  const image = selected[Math.floor(Math.random() * selected.length)];
  res.json({ image });
});

// Serve a random quote
app.get('/quote', (req, res) => {
  const brand = req.query.brand?.toLowerCase() || 'wttt';
  const selected = quotes[brand] || quotes['wttt'];
  const quote = selected[Math.floor(Math.random() * selected.length)];
  res.json({ quote });
});

// Serve a background bundle (image + quote)
app.get('/background', (req, res) => {
  const brand = req.query.brand?.toLowerCase() || 'wttt';
  const selectedImages = images[brand] || images['wttt'];
  const selectedQuotes = quotes[brand] || quotes['wttt'];

  const image = selectedImages[Math.floor(Math.random() * selectedImages.length)];
  const quote = selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)];

  res.json({ brand, image, quote });
});

// Serve a full Notion-ready creative content bundle
app.get('/notion-payload', (req, res) => {
  const brand = req.query.brand?.toLowerCase() || 'wttt';

  const selectedImages = images[brand] || images['wttt'];
  const selectedQuotes = quotes[brand] || quotes['wttt'];
  const selectedMoods = moods[brand] || moods['wttt'];

  const image = selectedImages[Math.floor(Math.random() * selectedImages.length)];
  const quote = selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)];
  const mood = selectedMoods[Math.floor(Math.random() * selectedMoods.length)];

  res.json({
    title: `Daily Creative — ${brandMap[brand] || 'Unknown Brand'}`,
    image,
    quote,
    mood
  });
});

// Start the server
app.listen(port, () => {
  console.log(`✅ TRIBECORE server running on port ${port}`);
});

