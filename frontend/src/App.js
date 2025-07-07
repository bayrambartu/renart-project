import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("API hatası:", error);
      });
  }, []);

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Ürün Listesi</h1>
      {products.length === 0 ? (
        <p>Yükleniyor...</p>
      ) : (
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
