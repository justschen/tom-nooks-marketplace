import React, { useState, useRef, useEffect } from 'react';
import './SortDropdown.css';

export type SortOption = 'aToZ' | 'zToA';

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const options = [
    { value: 'aToZ', label: 'Name (A to Z)' },
    { value: 'zToA', label: 'Name (Z to A)' }
  ];

  const currentLabel = options.find(option => option.value === currentSort)?.label || 'Sort by';

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleOptionClick = (value: SortOption) => {
    onSortChange(value);
    setIsOpen(false);
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
    <div className="sort-dropdown-container" ref={dropdownRef}>
      <div className="sort-label">Sort by:</div>
      <div className="custom-dropdown">
        <div 
          className={`dropdown-header ${isOpen ? 'active' : ''}`} 
          onClick={toggleDropdown}
        >
          <span className="selected-option">{currentLabel}</span>
          <span className={`dropdown-arrow ${isOpen ? 'up' : 'down'}`}>
            {isOpen ? '▲' : '▼'}
          </span>
        </div>
        {isOpen && (
          <div className="dropdown-options">
            {options.map(option => (
              <div
                key={option.value}
                className={`dropdown-option ${currentSort === option.value ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option.value as SortOption)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;
