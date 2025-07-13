import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import nookLogo from '../images/nook-logo.png';

const Navbar: React.FC = () => {
  const location = useLocation();
  
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
          <li className={location.pathname === '/products' ? 'active' : ''}>
            <Link to="/products">All Products</Link>
          </li>
          {/* Furniture item commented out
          <li className={location.pathname === '/furniture' ? 'active' : ''}>
            <Link to="/furniture">Furniture</Link>
          </li>
          */}
          {/* Tools item commented out
          <li className={location.pathname === '/tools' ? 'active' : ''}>
            <Link to="/tools">Tools</Link>
          </li>
          */}
          <li className={location.pathname === '/clothing' ? 'active' : ''}>
            <Link to="/clothing">Clothing</Link>
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
