import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState('rose');
  const colors = ['yellow', 'white', 'rose'];

  const imageUrl = product.images?.[selectedColor] || '';
  const popularity = product.popularityScoreOutOf5 || 0;

  const handlePrev = () => {
    const currentIndex = colors.indexOf(selectedColor);
    const prevIndex = (currentIndex - 1 + colors.length) % colors.length;
    setSelectedColor(colors[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = colors.indexOf(selectedColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    setSelectedColor(colors[nextIndex]);
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', width: '300px' }}>
      {/* Görsel */}
      <div style={{ position: 'relative', height: '250px', marginBottom: '10px', background: '#e4b4b4', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>
        <button onClick={handlePrev} style={{ position: 'absolute', left: 10, background: 'transparent', border: 'none', fontSize: '24px' }}>
          <FaChevronLeft />
        </button>
        <img src={imageUrl} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px' }} />
        <button onClick={handleNext} style={{ position: 'absolute', right: 10, background: 'transparent', border: 'none', fontSize: '24px' }}>
          <FaChevronRight />
        </button>
      </div>

      {/* Renk Butonları */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
        {colors.map((color) => (
          <div
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: color === 'yellow' ? '#D4AF37' : color === 'white' ? '#D3D3D3' : '#e9a8a6',
              border: selectedColor === color ? '2px solid black' : '1px solid #ccc',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>

      {/* Renk ismi */}
      <p style={{ textAlign: 'center', marginBottom: '8px' }}>
        <strong>{selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} Gold</strong>
      </p>

      {/* Popülerlik */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginBottom: '10px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} style={{ fontSize: '18px', color: '#FFD700' }}>
            {i + 1 <= Math.floor(popularity)
              ? '★'
              : i < popularity
              ? '⯪'
              : '☆'}
          </span>
        ))}
        <span style={{ fontWeight: '500' }}>{popularity.toFixed(1)}/5</span>
      </div>

      {/* Ürün ismi */}
      <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{product.name}</h3>

      {/* Fiyat */}
      <p style={{ textAlign: 'center' }}>
        <strong>Price:</strong> {product.price.toFixed(2)} USD
      </p>
    </div>
  );
};

export default ProductCard;