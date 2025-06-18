const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

// ✅ Brand-specific image URLs (extendable)
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

// ✅ Brand-specific quotes (extendable)
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

// ✅ HTML Dashboard
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>TRIBECORE Asset Dashboard</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; background: #0d0d0d; color: #f0f0f0; text-align: center; padding: 40px; }
        h1 { font-size: 2.5em; margin-bottom: 10px; }
        p { color: #aaa; }
        .grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 30px; }
        a.button {
          display: inline-block;
          padding: 15px 25px;
          background: #1e1e1e;
          color: #fff;
          text-decoration: none;
          border: 2px solid #444;
          border-radius: 8px;
          transition: 0.2s;
        }
        a.button:hover {
          background: #28a745;
          border-color: #28a745;
        }
      </style>
    </head>
    <body>
      <h1>🔥 TRIBECORE Asset API Dashboard</h1>
      <p>Generate marketing payloads for WTTT, Jabroni’s, and Denly Gardens</p>
      <div class="grid">
        <a class="button" href="/notion-payload?brand=wttt">🎯 WTTT Payload</a>
        <a class="button" href="/notion-payload?brand=jabroni">🔥 Jabroni Payload</a>
        <a class="button" href="/notion-payload?brand=denly">🍕 Denly Payload</a>
        <a class="button" href="/quote?brand=wttt">🧠 WTTT Quote Only</a>
        <a class="button" href="/random?brand=wttt">🖼 WTTT Image Only</a>
        <a class="button" href="/quote?brand=jabroni">💬 Jabroni Quote</a>
        <a class="button" href="/random?brand=denly">📸 Denly Image</a>
      </div>
      <p style="margin-top: 40px; font-size: 0.9em; color: #666;">
        TRIBECORE v1.0 — Modular API for Creative Automation <br>
        Ready for Zapier, Notion, Canva & Content Ops integrations
      </p>
    </body>
    </html>
  `);
});

// 🎯 API to get a random image for a brand
app.get('/random', (req, res) => {
  const brand = req.query.brand || 'wttt';
  const selected = images[brand] || images['wttt'];
  const image = selected[Math.floor(Math.random() * selected.length)];
  res.json({ brand, image });
});

// 💬 API to get a random quote
app.get('/quote', (req, res) => {
  const brand = req.query.brand || 'wttt';
  const selected = quotes[brand] || quotes['wttt'];
  const quote = selected[Math.floor(Math.random() * selected.length)];
  res.json({ brand, quote });
});

// 🔁 API to get full payload (image + quote)
app.get('/notion-payload', (req, res) => {
  const brand = req.query.brand || 'wttt';
  const selectedImages = images[brand] || images['wttt'];
  const selectedQuotes = quotes[brand] || quotes['wttt'];

  const image = selectedImages[Math.floor(Math.random() * selectedImages.length)];
  const quote = selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)];

  // 🎁 Return useful object for Zapier, Notion, or dashboard usage
  res.json({
    title: `Daily Creative — ${brand.toUpperCase()}`,
    brand,
    image,
    quote,
    mood: brand === 'wttt' ? "🌀 Ancestral" : brand === 'jabroni' ? "🔥 Bold" : "🍕 Nostalgic"
  });
});

// 🚀 App listener
app.listen(port, '0.0.0.0', () => {
  console.log(`TRIBECORE server running on port ${port}`);
});

