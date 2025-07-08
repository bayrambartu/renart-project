import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const colors = ['yellow', 'white', 'rose'];
  const [selectedColor, setSelectedColor] = useState('rose');

  const imageUrl = product.images?.[selectedColor] || '';
  const popularity = product.popularityScoreOutOf5 || 0;
  const price = product.price || 0;

  const handlePrev = () => {
    const index = colors.indexOf(selectedColor);
    const prevIndex = (index - 1 + colors.length) % colors.length;
    setSelectedColor(colors[prevIndex]);
  };

  const handleNext = () => {
    const index = colors.indexOf(selectedColor);
    const nextIndex = (index + 1) % colors.length;
    setSelectedColor(colors[nextIndex]);
  };

  return (
    <div style={{ width: 280, border: '1px solid #ccc', borderRadius: 10, padding: 16, margin: 12 }}>
      {/* Görsel Alanı */}
      <div style={{ position: 'relative', height: 220, marginBottom: 12, background: '#e4b4b4', borderRadius: 10 }}>
        <button onClick={handlePrev} style={{ position: 'absolute', left: 10, top: '45%', background: 'transparent', border: 'none', fontSize: 20 }}>
          <FaChevronLeft />
        </button>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`${product.name} - ${selectedColor}`}
            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10 }}
          />
        )}
        <button onClick={handleNext} style={{ position: 'absolute', right: 10, top: '45%', background: 'transparent', border: 'none', fontSize: 20 }}>
          <FaChevronRight />
        </button>
      </div>

      {/* Renk Seçimi */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
        {colors.map(color => (
          <div
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: color === 'yellow' ? '#D4AF37' : color === 'white' ? '#ddd' : '#e9a8a6',
              border: selectedColor === color ? '2px solid black' : '1px solid #999',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>

      {/* Seçilen Renk İsmi */}
      <p style={{ textAlign: 'center', marginBottom: 4 }}>
        {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} Gold
      </p>

      {/* Popularity (Yıldızlar) */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} style={{ color: '#FFD700', fontSize: 18 }}>
            {i + 1 <= Math.floor(popularity)
              ? '★'
              : i < popularity
              ? '⯪'
              : '☆'}
          </span>
        ))}
        <span style={{ marginLeft: 4 }}>{popularity.toFixed(1)}/5</span>
      </div>

      {/* Ürün İsmi */}
      <h3 style={{ textAlign: 'center', fontWeight: 600, marginBottom: 8 }}>{product.name}</h3>

      {/* Fiyat */}
      <p style={{ textAlign: 'center' }}>
        <strong>Price:</strong> {price.toFixed(2)} USD
      </p>
    </div>
  );
};

export default ProductCard;