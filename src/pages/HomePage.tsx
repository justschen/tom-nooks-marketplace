import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import heroImage from '../images/hero1.jpg'; // Import the hero image

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${heroImage})` }}>
        <div className="hero-content">
          <h1>Welcome to Tom Nook's Marketplace</h1>
          <p>Your one-stop shop for all your island needs!</p>
          <Link to="/products"><button className="cta-button">Shop Now</button></Link>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features">
        <h2>Why Shop with Tom Nook?</h2>
        <div className="feature-grid">
          <div className="feature">
            <div className="feature-icon">🏝️</div>
            <h3>Island Delivery</h3>
            <p>Free shipping to any island in the archipelago!</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>Changed your mind? Return within 30 days!</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon">🎁</div>
            <h3>Nook Miles Rewards</h3>
            <p>Earn points with every purchase!</p>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Items</h2>
        <p>Check out our most popular products this season!</p>
        <div className="featured-grid">
          <div className="featured-item">
            <div className="featured-image placeholder"></div>
            <h3>Premium Tools</h3>
            <p>Built to last for all your island tasks</p>
          </div>
          
          <div className="featured-item">
            <div className="featured-image placeholder"></div>
            <h3>Stylish Furniture</h3>
            <p>Upgrade your home in style</p>
          </div>
          
          <div className="featured-item">
            <div className="featured-image placeholder"></div>
            <h3>Seasonal Clothing</h3>
            <p>Look your best in any weather</p>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial">
            <p>"Tom Nook's tools helped me build my dream island!"</p>
            <cite>- Isabelle</cite>
          </div>
          
          <div className="testimonial">
            <p>"The quality of furniture is outstanding. Highly recommended!"</p>
            <cite>- K.K. Slider</cite>
          </div>
          
          <div className="testimonial">
            <p>"Fast delivery and excellent customer service!"</p>
            <cite>- Blathers</cite>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
