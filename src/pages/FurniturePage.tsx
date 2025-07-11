import React from 'react';
import '../pages/PlaceholderStyles.css';

const FurniturePage: React.FC = () => {
  return (
    <div>
      <h1>Furniture</h1>
      <p>Our furniture collection is coming soon! Check back later for our latest items.</p>
      
      <div className="placeholder-container">
        <div className="placeholder-message">
          <img src={require('../images/nook-logo.png')} alt="Nook Logo" className="nook-logo" />
          <h2>New Furniture Arriving Soon</h2>
          <p>Tom Nook is busy acquiring the finest furniture for your island home.</p>
        </div>
      </div>
    </div>
  );
};

export default FurniturePage;
