import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSending(true);

    // Wait for the airplane animation to finish, then show success
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 2000);
  };

  const handleReset = () => {
    setSent(false);
    setName('');
    setMessage('');
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>Send a letter to Nook Inc. — we'd love to hear from you!</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="contact-form-card">
          <div className="contact-card-header">
            <span className="contact-icon">✉️</span>
            <h2>Write Us a Letter</h2>
            <p>Drop a message in the mailbox and we'll get back to you faster than a Dodo Airlines flight!</p>
          </div>

          {sent ? (
            <div className="contact-success">
              <div className="success-icon">🎉</div>
              <h3>Message Sent!</h3>
              <p>Thanks, <strong>{name}</strong>! Your letter has been delivered by Pete the Pelican.</p>
              <button className="contact-btn" onClick={handleReset}>
                Send Another Letter
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your villager name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={sending}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  placeholder="Write your message here..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={sending}
                />
              </div>

              <button
                type="submit"
                className={`contact-btn submit-btn ${sending ? 'sending' : ''}`}
                disabled={sending}
              >
                {sending ? 'Sending...' : '✈️ Send Letter'}
              </button>
            </form>
          )}

          {/* Airplane emoji animation overlay */}
          {sending && (
            <div className="airplane-overlay">
              <div className="paper-airplane">✈️</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
