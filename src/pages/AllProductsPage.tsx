import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import SortDropdown, { SortOption } from '../components/SortDropdown';
import FilterDropdown, { FilterOptions } from '../components/FilterDropdown';
import { Product } from '../types';
import './AllProductsPage.css';

interface AllProductsPageProps {
  products: Product[];
}

const AllProductsPage: React.FC<AllProductsPageProps> = ({ products }) => {
  const [sortOption, setSortOption] = useState<SortOption>('aToZ');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: null,
    priceRange: { min: 0, max: 20000 }
  });

  // Extract unique categories from products and filter out "nook-miles"
  const categories = useMemo(() => {
    const categorySet = new Set(products.map(product => product.category));
    const categoriesArray = Array.from(categorySet);
    // Explicitly remove "nook-miles" category from the dropdown even if some products have that category
    return categoriesArray.filter(category => category !== "nook-miles");
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
    <div>
      <h1>All Products</h1>
      <p>Browse our complete inventory of quality items.</p>
      
      {products.length > 0 && (
        <>
          <div className="controls-container">
            <FilterDropdown 
              currentFilters={filterOptions} 
              onFilterChange={setFilterOptions}
              categories={categories}
              showCategoryFilter={true} // Show category filter on the AllProductsPage
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

export default AllProductsPage;
