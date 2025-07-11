import React from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface AllProductsPageProps {
  products: Product[];
}

const AllProductsPage: React.FC<AllProductsPageProps> = ({ products }) => {
  return (
    <div>
      <h1>All Products</h1>
      <p>Browse our complete inventory of quality items.</p>
      
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
