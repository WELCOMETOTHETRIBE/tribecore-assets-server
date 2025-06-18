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

// ✅ NEW: Root route for health check
app.get("/", (req, res) => {
  res.send("✅ TRIBECORE server is up and running!");
});

app.get('/random', (req, res) => {
  const brand = req.query.brand || 'wttt';
  const selected = images[brand] || images['wttt'];
  const image = selected[Math.floor(Math.random() * selected.length)];
  res.json({ image });
});

app.get('/quote', (req, res) => {
  const brand = req.query.brand || 'wttt';
  const selected = quotes[brand] || quotes['wttt'];
  const quote = selected[Math.floor(Math.random() * selected.length)];
  res.json({ quote });
});

app.get('/notion-payload', (req, res) => {
  const brand = req.query.brand || 'wttt';
  const selectedImages = images[brand] || images['wttt'];
  const selectedQuotes = quotes[brand] || quotes['wttt'];
  const image = selectedImages[Math.floor(Math.random() * selectedImages.length)];
  const quote = selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)];

  res.json({ brand, image, quote });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`TRIBECORE server running on ${port}`);
});

