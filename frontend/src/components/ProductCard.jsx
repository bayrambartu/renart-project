import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState('yellow');
  const swiperRef = useRef(null);

  const colorMap = {
    yellow: '#E6CA97',
    white: '#D9D9D9',
    rose: '#E1A4A9'
  };

  const colorKeys = Object.keys(product.images);
  const selectedImage = product.images[selectedColor];

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', width: '250px' }}>
      <Swiper
        modules={[Navigation]}
        navigation
        onSlideChange={(swiper) => {
          const colorKey = colorKeys[swiper.activeIndex];
          setSelectedColor(colorKey);
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        style={{ marginBottom: '10px' }}
      >
        {colorKeys.map((color) => (
          <SwiperSlide key={color}>
            <img
              src={product.images[color]}
              alt={product.name}
              width="100%"
              style={{ borderRadius: '10px' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/250x250?text=No+Image';
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* color dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
        {colorKeys.map((color, index) => (
          <div
            key={color}
            onClick={() => {
              setSelectedColor(color);
              swiperRef.current?.slideTo(index);
            }}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: colorMap[color],
              border: selectedColor === color ? '2px solid black' : '1px solid gray',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>

      <p style={{ textAlign: 'center', fontWeight: '500', margin: '8px 0' }}>
        {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} Gold
      </p>

      {/* Yıldızlar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginBottom: '10px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} style={{ fontSize: '18px', color: '#FFD700' }}>
            {i + 1 <= Math.floor(product.popularityOutOfFive)
              ? '★'
              : i < product.popularityOutOfFive
              ? '⯪'
              : '☆'}
          </span>
        ))}
        <span style={{ fontWeight: '500' }}>{product.popularityOutOfFive}/5</span>
      </div>

      <h3>{product.name}</h3>
      <p><strong>Price:</strong> {product.price} USD</p>
    </div>
  );
};

export default ProductCard;