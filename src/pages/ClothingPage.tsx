import React from 'react';
import '../pages/PlaceholderStyles.css';

const ClothingPage: React.FC = () => {
  return (
    <div>
      <h1>Clothing</h1>
      <p>Our clothing collection is coming soon! Check back later for our latest fashion items.</p>
      
      <div className="placeholder-container">
        <div className="placeholder-message">
          <img src={require('../images/nook-logo.png')} alt="Nook Logo" className="nook-logo" />
          <h2>New Clothing Arriving Soon</h2>
          <p>Stay tuned for the latest fashion trends from the Able Sisters!</p>
        </div>
      </div>
    </div>
  );
};

export default ClothingPage;
