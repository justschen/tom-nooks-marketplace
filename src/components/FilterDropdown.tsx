import React, { useState, useRef, useEffect, useCallback } from 'react';
import './FilterDropdown.css';

export interface FilterOptions {
  category: string | null;
  priceRange: {
    min: number | null;
    max: number | null;
  };
}

interface FilterDropdownProps {
  currentFilters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  categories: string[];
  showCategoryFilter?: boolean; // Optional prop to control category filter visibility
  isNookMilesPage?: boolean; // Optional prop to indicate if we're on the Nook Miles page
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ 
  currentFilters, 
  onFilterChange, 
  categories,
  showCategoryFilter = false, // Default to false - only show on AllProductsPage
  isNookMilesPage = false // Default to false - set to true on NookMilesPage
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [tempFilters, setTempFilters] = useState<FilterOptions>(currentFilters);
  
  // Constants for price range slider
  const MIN_PRICE = 0;
  const MAX_PRICE = 20000;
  
  // State to track the position of each slider thumb
  const [sliderValues, setSliderValues] = useState({
    min: tempFilters.priceRange.min !== null ? tempFilters.priceRange.min : MIN_PRICE,
    max: tempFilters.priceRange.max !== null ? tempFilters.priceRange.max : MAX_PRICE
  });
  
  // Reset temp filters when currentFilters change from outside
  useEffect(() => {
    setTempFilters(currentFilters);
    setSliderValues({
      min: currentFilters.priceRange.min !== null ? currentFilters.priceRange.min : MIN_PRICE,
      max: currentFilters.priceRange.max !== null ? currentFilters.priceRange.max : MAX_PRICE
    });
  }, [currentFilters]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCategoryChange = (category: string | null) => {
    setTempFilters(prev => ({
      ...prev,
      category
    }));
  };

  // Handle changes for the range slider
  const rangeSliderContainerRef = useRef<HTMLDivElement>(null);

  // Update CSS variables for track highlight using useCallback
  const updateRangeHighlight = useCallback(() => {
    if (rangeSliderContainerRef.current) {
      const minPercent = ((sliderValues.min - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
      const maxPercent = ((sliderValues.max - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
      
      rangeSliderContainerRef.current.style.setProperty('--slider-min-pos', `${minPercent}%`);
      rangeSliderContainerRef.current.style.setProperty('--slider-max-pos', `${maxPercent}%`);
    }
  }, [sliderValues, MIN_PRICE, MAX_PRICE]);

  // Update highlight when slider values change
  useEffect(() => {
    updateRangeHighlight();
  }, [updateRangeHighlight]);

  const handleMinRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const newMin = Math.min(value, sliderValues.max);
    
    setSliderValues(prev => ({
      ...prev,
      min: newMin
    }));
    
    setTempFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        min: newMin
      }
    }));
  };

  const handleMaxRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const newMax = Math.max(value, sliderValues.min);
    
    setSliderValues(prev => ({
      ...prev,
      max: newMax
    }));
    
    setTempFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        max: newMax
      }
    }));
  };

  const applyFilters = () => {
    onFilterChange(tempFilters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const resetFilters: FilterOptions = {
      category: null,
      priceRange: { min: MIN_PRICE, max: MAX_PRICE }
    };
    setTempFilters(resetFilters);
    onFilterChange(resetFilters);
    setIsOpen(false);
  };

  // Create a display of the active filters for the closed dropdown header
  const getActiveFiltersDisplay = () => {
    const parts = [];
    const currencyLabel = isNookMilesPage ? 'Nook Miles' : 'Bells';
    
    // Only show category information if the category filter is enabled
    if (showCategoryFilter && currentFilters.category) {
      const formattedCategory = currentFilters.category.charAt(0).toUpperCase() + currentFilters.category.slice(1);
      parts.push(formattedCategory);
    }
    
    const { min, max } = currentFilters.priceRange;
    if (min !== null && min > MIN_PRICE && max !== null && max < MAX_PRICE) {
      parts.push(`${min}-${max} ${currencyLabel}`);
    } else if (min !== null && min > MIN_PRICE) {
      parts.push(`>${min} ${currencyLabel}`);
    } else if (max !== null && max < MAX_PRICE) {
      parts.push(`<${max} ${currencyLabel}`);
    }
    
    // Determine the default display text based on whether we're showing categories
    const defaultText = showCategoryFilter ? 'All Products' : 'Price Filter';
    return parts.length > 0 ? parts.join(', ') : defaultText;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-dropdown-container" ref={dropdownRef}>
      <div className="filter-label">Filter by:</div>
      <div className="custom-dropdown">
        <div 
          className={`dropdown-header ${isOpen ? 'active' : ''}`} 
          onClick={toggleDropdown}
        >
          <span className="selected-option">{getActiveFiltersDisplay()}</span>
          <span className={`dropdown-arrow ${isOpen ? 'up' : 'down'}`}>
            {isOpen ? '▲' : '▼'}
          </span>
        </div>
        {isOpen && (
          <div className="filter-dropdown-options">
            {showCategoryFilter && (
              <div className="filter-section">
                <h4>Category</h4>
                <div className="category-options">
                  <div 
                    className={`filter-option ${tempFilters.category === null ? 'selected' : ''}`}
                    onClick={() => handleCategoryChange(null)}
                  >
                    All Categories
                  </div>
                  {categories.map(category => (
                    <div
                      key={category}
                      className={`filter-option ${tempFilters.category === category ? 'selected' : ''}`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="filter-section">
              <h4>{isNookMilesPage ? 'Nook Miles Price' : 'Total Bells Price'}</h4>
              <div className="price-range-filter">
                <div className="range-slider-container" ref={rangeSliderContainerRef}>
                  <div className="dual-range-slider">
                    {/* Min slider (left thumb) */}
                    <input
                      type="range"
                      className="price-slider range-slider min-slider"
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      step="100"
                      value={sliderValues.min}
                      onChange={handleMinRangeChange}
                      aria-label="Minimum price"
                    />
                    
                    {/* Max slider (right thumb) */}
                    <input
                      type="range"
                      className="price-slider range-slider max-slider"
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      step="100"
                      value={sliderValues.max}
                      onChange={handleMaxRangeChange}
                      aria-label="Maximum price"
                    />
                  </div>
                  
                  <div className="range-values">
                    <span className="slider-value min-value">
                      {sliderValues.min} {isNookMilesPage ? 'Miles' : 'Bells'}
                    </span>
                    <span className="slider-value max-value">
                      {sliderValues.max} {isNookMilesPage ? 'Miles' : 'Bells'}
                    </span>
                  </div>
                </div>
                
                <div className="price-range-summary">
                  Price Range: <strong>{sliderValues.min} - {sliderValues.max} {isNookMilesPage ? 'Nook Miles' : 'Total Bells'}</strong>
                </div>
              </div>
            </div>
            
            <div className="filter-actions">
              <button className="filter-clear-btn" onClick={clearFilters}>Clear</button>
              <button className="filter-apply-btn" onClick={applyFilters}>Apply</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;
