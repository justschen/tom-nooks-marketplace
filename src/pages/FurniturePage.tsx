import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import SortDropdown, { SortOption } from '../components/SortDropdown';
import FilterDropdown, { FilterOptions } from '../components/FilterDropdown';
import { Product } from '../types';
import './AllProductsPage.css';

interface FurniturePageProps {
  products: Product[];
}

const FurniturePage: React.FC<FurniturePageProps> = ({ products }) => {
  const [sortOption, setSortOption] = useState<SortOption>('aToZ');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: null,
    priceRange: { min: 0, max: 20000 }
  });

  // Extract unique categories from products
  const categories = useMemo(() => {
    const categorySet = new Set(products.map(product => product.category));
    return Array.from(categorySet);
  }, [products]);
  
  // Filter products based on filterOptions
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Filter by category if selected
      if (filterOptions.category && product.category !== filterOptions.category) {
        return false;
      }
      
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
    <div>
      <h1>Furniture</h1>
      <p>Explore our extensive collection of furniture to decorate your island home!</p>
      
      {products.length > 0 && (
        <>
          <div className="controls-container">
            <FilterDropdown 
              currentFilters={filterOptions} 
              onFilterChange={setFilterOptions}
              categories={categories}
              showCategoryFilter={false} // Don't show category filter on specific category pages
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
      
      <div className="product-grid">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FurniturePage;
