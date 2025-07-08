import React, { useState } from 'react';

const ProductCard = ({ product }) => {
  const colors = ['yellow','white','rose'];
  const [color, setColor] = useState(colors[0]);
  const img = product.images?.[color] || '';
  const pop = product.popularityScoreOutOf5 || 0;
  const price = product.price || 0;

  return (
    <div>
      <img src={img} alt="" width="200"/>
      <p>{product.name}</p>
      <p>{price.toFixed(2)} USD</p>
      <p>{Array.from({ length: 5 }).map((_, i) =>
        i+1 <= Math.floor(pop) ? '★' : i < pop ? '⯪' : '☆'
      ).join('')} {pop.toFixed(1)}/5</p>
      <div>
        {colors.map(c => <button key={c} onClick={()=>setColor(c)}>{c}</button>)}
      </div>
    </div>
  );
};

export default ProductCard;