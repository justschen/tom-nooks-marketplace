import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import SortDropdown, { SortOption } from '../components/SortDropdown';
import FilterDropdown, { FilterOptions } from '../components/FilterDropdown';
import './AllProductsPage.css';
import './NookMilesPage.css';

interface NookMilesPageProps {
  products: Product[];
}

const NookMilesPage: React.FC<NookMilesPageProps> = ({ products }) => {
  const [sortOption, setSortOption] = useState<SortOption>('aToZ');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: null,
    priceRange: {
      min: 0,
      max: 20000
    }
  });
  
  // Extract unique categories from products (will just be "nook-miles")
  const categories = useMemo(() => {
    const categorySet = new Set(products.map(product => product.category));
    return Array.from(categorySet);
  }, [products]);
  
  // Filter products based on filterOptions
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Filter by price range (both min and max values)
      const { min, max } = filterOptions.priceRange;
      if (min !== null && product.price < min) {
        return false;
      }
      if (max !== null && product.price > max) {
        return false;
      }
      
      return true;
    });
  }, [products, filterOptions]);
  
  // Sort the filtered products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortOption === 'aToZ') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [filteredProducts, sortOption]);

  return (
    <div className="nook-miles-page">
      <h1>Nook Stop Items</h1>
      <p>Redeem your Nook Miles for these exclusive items! Only available through the Nook Stop terminal.</p>
      
      {products.length > 0 && (
        <>
          <div className="controls-container nook-miles-page">
            <FilterDropdown 
              currentFilters={filterOptions} 
              onFilterChange={setFilterOptions}
              categories={categories}
              showCategoryFilter={false} // Don't need category filter on Nook Miles page
              isNookMilesPage={true} // Indicate that we're on the Nook Miles page
            />
            <SortDropdown 
              currentSort={sortOption} 
              onSortChange={setSortOption} 
            />
          </div>
          
          <div className="product-count">
            Showing {sortedProducts.length} of {products.length} products
          </div>
        </>
      )}
      
      <div className="product-grid nook-miles-grid">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NookMilesPage;
