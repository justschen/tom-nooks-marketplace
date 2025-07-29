import React from 'react';
import './TeamPage.css';

// Import team member images
import tomNookImg from '../images/characters/tom-nook.png';
import timmyTommyImg from '../images/characters/timmy-tommy.png';
import isabelleImg from '../images/characters/isabelle.png';
import kkSliderImg from '../images/characters/kk-slider.png';
import blathersImg from '../images/characters/blathers.png';

const TeamPage: React.FC = () => {
  const teamMembers = [
    {
      name: "Tom Nook",
      role: "Real Estate Mogul / Town Developer",
      description: "The visionary behind Nook Inc., Tom Nook helps residents develop their islands and achieve their dreams through strategic real estate development.",
      image: tomNookImg
    },
    {
      name: "Timmy and Tommy",
      role: "Shop Keepers", 
      description: "The dynamic duo who keep Nook's Cranny running smoothly. They're always ready to help with your shopping needs and inventory management.",
      image: timmyTommyImg
    },
    {
      name: "Isabelle",
      role: "Town Secretary / Island Assistant",
      description: "Your dedicated island assistant who helps with daily announcements, island ratings, and keeping everything organized and running efficiently.",
      image: isabelleImg
    },
    {
      name: "K.K. Slider",
      role: "Emotional Support Musician",
      description: "The traveling musician who brings joy and music to our community. His performances lift spirits and create memorable island experiences.",
      image: kkSliderImg
    },
    {
      name: "Blathers",
      role: "Historian and Museum Curator",
      description: "Our knowledgeable museum curator who preserves island history and educates the community about fossils, art, and natural specimens.",
      image: blathersImg
    }
  ];

  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="team-hero">
        <div className="team-hero-content">
          <h1>Meet Our Team</h1>
          <p>The dedicated individuals who make Tom Nook's Marketplace and your island experience exceptional</p>
        </div>
      </section>
      
      {/* Team Members Section */}
      <section className="team-members-container">
        <h2>Our Island Experts</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <h4>{member.role}</h4>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="team-mission">
        <h2>Our Mission</h2>
        <p>
          Together, we work to provide the best possible island experience for all residents. 
          From shopping and development to entertainment and education, our team is committed 
          to helping you create the perfect island paradise.
        </p>
      </section>
      
      {/* Values Section */}
      <section className="team-values">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <div className="value-icon">🌱</div>
            <h3>Sustainability</h3>
            <p>We're committed to eco-friendly practices that preserve island beauty for future generations.</p>
          </div>
          
          <div className="value-item">
            <div className="value-icon">🤝</div>
            <h3>Community</h3>
            <p>Building strong relationships with residents is at the heart of everything we do.</p>
          </div>
          
          <div className="value-item">
            <div className="value-icon">💡</div>
            <h3>Innovation</h3>
            <p>We're always looking for new ways to improve island living and enhance your experience.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
