import React from 'react';
import './ProductCard.css';
import { Product } from '../types';
import bellsIcon from '../images/bells.png';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image" 
      />
      <h3>{product.name}</h3>
      <p className="price">
        {product.price} <img src={bellsIcon} alt="Bells" className="bells-icon" />
      </p>
      <button className="buy-button">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
