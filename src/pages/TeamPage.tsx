import React from 'react';
import './TeamPage.css';

const TeamPage: React.FC = () => {
  const teamMembers = [
    {
      name: "Tom Nook",
      role: "Real Estate Mogul / Town Developer",
      description: "The visionary behind Nook Inc., Tom Nook helps residents develop their islands and achieve their dreams through strategic real estate development.",
      emoji: "🦝"
    },
    {
      name: "Timmy and Tommy",
      role: "Shop Keepers", 
      description: "The dynamic duo who keep Nook's Cranny running smoothly. They're always ready to help with your shopping needs and inventory management.",
      emoji: "🛍️"
    },
    {
      name: "Isabelle",
      role: "Town Secretary / Island Assistant",
      description: "Your dedicated island assistant who helps with daily announcements, island ratings, and keeping everything organized and running efficiently.",
      emoji: "🐕"
    },
    {
      name: "K.K. Slider",
      role: "Emotional Support Musician",
      description: "The traveling musician who brings joy and music to our community. His performances lift spirits and create memorable island experiences.",
      emoji: "🎸"
    },
    {
      name: "Blathers",
      role: "Historian and Museum Curator",
      description: "Our knowledgeable museum curator who preserves island history and educates the community about fossils, art, and natural specimens.",
      emoji: "🦉"
    }
  ];

  return (
    <div className="team-page">
      <section className="team-hero">
        <h1>Meet Our Team</h1>
        <p>The dedicated individuals who make Tom Nook's Marketplace and your island experience exceptional</p>
      </section>

      <section className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <div className="member-emoji">{member.emoji}</div>
            <h3>{member.name}</h3>
            <h4>{member.role}</h4>
            <p>{member.description}</p>
          </div>
        ))}
      </section>

      <section className="team-mission">
        <h2>Our Mission</h2>
        <p>
          Together, we work to provide the best possible island experience for all residents. 
          From shopping and development to entertainment and education, our team is committed 
          to helping you create the perfect island paradise.
        </p>
      </section>
    </div>
  );
};

export default TeamPage;