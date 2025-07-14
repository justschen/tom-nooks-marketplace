import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import nookLogo from '../images/nook-logo.png';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <div className="logo-container">
              <img src={nookLogo} alt="Tom Nook's Logo" className="navbar-logo" />
              <h2>Tom Nook's Marketplace</h2>
            </div>
          </Link>
        </div>
        <ul className="navbar-links">
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li 
            ref={dropdownRef}
            className={`
              ${['/products', '/furniture', '/clothing', '/tools', '/gardening'].includes(location.pathname) 
                ? 'active' : ''}
              dropdown
              ${dropdownOpen ? 'dropdown-active' : ''}
            `}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link to="/products">
              All Products
              <span className="dropdown-icon">▼</span>
            </Link>
            <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
              <Link to="/furniture" className={location.pathname === '/furniture' ? 'active' : ''}>
                Furniture
              </Link>
              <Link to="/clothing" className={location.pathname === '/clothing' ? 'active' : ''}>
                Clothing
              </Link>
              <Link to="/tools" className={location.pathname === '/tools' ? 'active' : ''}>
                Tools
              </Link>
              <Link to="/gardening" className={location.pathname === '/gardening' ? 'active' : ''}>
                Gardening
              </Link>
            </div>
          </li>
          <li className={location.pathname === '/nook-stop' ? 'active' : ''}>
            <Link to="/nook-stop">Nook Stop</Link>
          </li>
          <li className={location.pathname === '/turnip-prices' ? 'active' : ''}>
            <Link to="/turnip-prices">Turnip Prices</Link>
          </li>
          <li className={location.pathname === '/team' ? 'active' : ''}>
            <Link to="/team">Team</Link>
          </li>
          <li className="navbar-cart">
            <Link to="/cart" className="cart-icon">🛒 Cart (0)</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
