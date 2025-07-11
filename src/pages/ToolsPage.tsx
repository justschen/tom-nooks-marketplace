import React from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface ToolsPageProps {
  products: Product[];
}

const ToolsPage: React.FC<ToolsPageProps> = ({ products }) => {
  return (
    <div>
      <h1>Tools</h1>
      <p>Browse our selection of high-quality tools for all your island needs.</p>
      
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
