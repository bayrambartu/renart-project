require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  "https://renart-project.vercel.app",
  "https://renart-project-n2kpwdp9d-bayrambartus-projects.vercel.app",
  "https://renart-frontend.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS reddedildi:", origin); // log ekledim
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

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