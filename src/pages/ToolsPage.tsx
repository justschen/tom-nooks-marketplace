import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import SortDropdown, { SortOption } from '../components/SortDropdown';
import { Product } from '../types';

interface ToolsPageProps {
  products: Product[];
}

const ToolsPage: React.FC<ToolsPageProps> = ({ products }) => {
  const [sortOption, setSortOption] = useState<SortOption>('aToZ');
  
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortOption === 'aToZ') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [products, sortOption]);
  
  return (
    <div>
      <h1>Tools</h1>
      <p>Browse our selection of high-quality tools for all your island needs.</p>
      
      {products.length > 0 && (
        <SortDropdown 
          currentSort={sortOption} 
          onSortChange={setSortOption} 
        />
      )}
      
      <div className="product-grid">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
