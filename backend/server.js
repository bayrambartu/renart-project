require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// --- YENİ KOD ---
const allowedOrigins = [
  "https://renart-project.vercel.app",   // Ana Vercel adresin
  "https://renart-frontend.vercel.app", // Diğer ana adresin
  
  /^https:\/\/renart-project-.*-bayrambartus-projects\.vercel\.app$/,
  
  "http://localhost:3000" 
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return allowedOrigin === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("Bu domaine CORS tarafından izin verilmiyor."));
    }
  }
}));
// --- YENİ KOD BİTTİ ---

const products = require('./products.json');

// Gerçek zamanlı altın fiyatını getiren fonksiyon
async function fetchGoldPrice() {
  try {
    const response = await axios.get('https://www.goldapi.io/api/XAU/USD', {
      headers: {
        'x-access-token': process.env.GOLD_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    const pricePerOunce = response.data.price;
    const pricePerGram = pricePerOunce / 31.1035; // 1 ons = 31.1035 gram
    return parseFloat(pricePerGram.toFixed(2));
  } catch (error) {
    console.error("Altın fiyatı alınamadı:", error.message);
    return 74.5; // fallback
  }
}

// Ürünleri dönen ve filtre uygulayan endpoint
app.get('/api/products', async (req, res) => {
  const goldPrice = await fetchGoldPrice();

  // Ürünleri zenginleştir
  const enrichedProducts = products.map((p) => {
    const price = ((p.popularityScore + 1) * p.weight * goldPrice).toFixed(2);
    return {
      ...p,
      price: parseFloat(price),
      popularityOutOfFive: parseFloat((p.popularityScore / 20).toFixed(1))
    };
  });

  // Query parametreleri
  const minPrice = parseFloat(req.query.minPrice);
  const maxPrice = parseFloat(req.query.maxPrice);
  const minPopularity = parseFloat(req.query.minPopularity);

  // Filtreleme işlemi
  let filtered = enrichedProducts;

  if (!isNaN(minPrice)) {
    filtered = filtered.filter(p => p.price >= minPrice);
  }

  if (!isNaN(maxPrice)) {
    filtered = filtered.filter(p => p.price <= maxPrice);
  }

  if (!isNaN(minPopularity)) {
    filtered = filtered.filter(p => p.popularityOutOfFive >= minPopularity);
  }

  res.json(filtered);
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});