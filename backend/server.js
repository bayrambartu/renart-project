const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: "https://renart-frontend.vercel.app"
}));

const products = require('./products.json');
const goldPrice = 74.5;

app.get('/api/products', (req, res) => {
  const enrichedProducts = products.map((p) => {
    const price = ((p.popularityScore + 1) * p.weight * goldPrice).toFixed(2);
    return {
      ...p,
      price: `${price} USD`,
      popularityOutOfFive: (p.popularityScore / 20).toFixed(1)
    };
  });
  res.json(enrichedProducts);
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});