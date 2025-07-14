import React from 'react';
import './ProductCard.css';
import { Product } from '../types';
import bellsIcon from '../images/bells.png';
import nookMilesIcon from '../images/nook-miles/Nook_Miles_NH_Icon.png';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Check if this is a Nook Miles product
  const isNookMiles = product.category === 'nook-miles';
  
  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image" 
      />
      <h3>{product.name}</h3>
      <p className={`price ${isNookMiles ? 'nook-miles-price' : ''}`}>
        {product.price} 
        <img 
          src={isNookMiles ? nookMilesIcon : bellsIcon} 
          alt={isNookMiles ? "Nook Miles" : "Bells"} 
          className={isNookMiles ? "nook-miles-icon" : "bells-icon"} 
        />
      </p>
      <button className="buy-button">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
