// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  "https://renart-project.vercel.app",
  "https://renart-frontend.vercel.app",
  /^https:\/\/renart-project-.*-bayrambartus-projects\.vercel\.app$/,
  "http://localhost:3000"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.some(allowed =>
      allowed instanceof RegExp ? allowed.test(origin) : allowed === origin
    );
    return isAllowed
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS"));
  }
}));

const products = require('./products.json');

async function fetchGoldPrice() {
  try {
    const res = await axios.get('https://www.goldapi.io/api/XAU/USD', {
      headers: {
        'x-access-token': process.env.GOLD_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    return (res.data.price / 31.1035).toFixed(2);
  } catch (e) {
    console.error("Altın fiyatı alınamadı:", e.message);
    return 74.5;
  }
}

app.get('/api/products', async (req, res) => {
  const goldPrice = await fetchGoldPrice();

  const enrichedProducts = products.map(p => {
    const enrichedColors = {};
    for (const color in p.colors) {
      const variant = p.colors[color];
      const price = ((variant.popularityScore + 1) * variant.weight * goldPrice).toFixed(2);
      const popularityOutOfFive = (variant.popularityScore / 20).toFixed(1);
      enrichedColors[color] = {
        ...variant,
        price: parseFloat(price),
        popularityOutOfFive: parseFloat(popularityOutOfFive)
      };
    }
    return {
      name: p.name,
      colors: enrichedColors
    };
  });

  res.json(enrichedProducts);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});