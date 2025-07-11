import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Tom Nook's Marketplace offers the finest goods from Animal Crossing. From furniture to tools, we've got everything you need for island life!</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>Nook Inc. Plaza</p>
          <p>Animal Crossing Island</p>
          <p>Email: tom@nooksinc.com</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tom Nook's Marketplace. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
