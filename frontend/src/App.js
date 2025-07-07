import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './components/ProductCard';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Yükleniyor kontrolü
  const [error, setError] = useState(null);      // Hata kontrolü

  useEffect(() => {
    axios.get("/api/products")
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("API hatası:", error);
        setError("Veriler alınamadı.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Ürün Listesi</h1>

      {loading && <p>Yükleniyor...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;