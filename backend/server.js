require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// 🎯 CORS Origin listesi ve log destekli kontrol
const allowedOrigins = [
  "https://renart-project.vercel.app",
  "https://renart-frontend.vercel.app",
  /^https:\/\/renart-project-.*-bayrambartus-projects\.vercel\.app$/,
  "http://localhost:3000"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      console.log("CORS: Origin boş (muhtemelen Postman veya tarayıcı tabı).");
      return callback(null, true);
    }

    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return allowedOrigin === origin;
    });

    if (isAllowed) {
      console.log("CORS: İzin verildi →", origin);
      callback(null, true);
    } else {
      console.log("CORS: Reddedildi →", origin);
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

// 📦 Ürün verisi
const products = require('./products.json');

// 💰 Altın fiyatını API'den çek
async function fetchGoldPrice() {
  try {
    const response = await axios.get('https://www.goldapi.io/api/XAU/USD', {
      headers: {
        'x-access-token': process.env.GOLD_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    const pricePerOunce = response.data.price;
    const pricePerGram = pricePerOunce / 31.1035;
    return parseFloat(pricePerGram.toFixed(2));
  } catch (error) {
    console.error("Altın fiyatı alınamadı:", error.message);
    return 74.5; // fallback
  }
}

// 📡 API endpoint
app.get('/api/products', async (req, res) => {
  const goldPrice = await fetchGoldPrice();

  const enrichedProducts = products.map(p => {
    const price = ((p.popularityScore + 1) * p.weight * goldPrice).toFixed(2);
    return {
      ...p,
      price: parseFloat(price),
      popularityOutOfFive: parseFloat((p.popularityScore / 20).toFixed(1))
    };
  });

  // 🔍 Filtre parametreleri
  const minPrice = parseFloat(req.query.minPrice);
  const maxPrice = parseFloat(req.query.maxPrice);
  const minPopularity = parseFloat(req.query.minPopularity);

  let filtered = enrichedProducts;

  if (!isNaN(minPrice)) filtered = filtered.filter(p => p.price >= minPrice);
  if (!isNaN(maxPrice)) filtered = filtered.filter(p => p.price <= maxPrice);
  if (!isNaN(minPopularity)) filtered = filtered.filter(p => p.popularityOutOfFive >= minPopularity);

  res.json(filtered);
});

// 🚀 Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});