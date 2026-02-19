import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import nookLogo from '../images/nook-logo.png';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello there! I'm Tom Nook, and I'm here to help you with anything you need to know about our marketplace! What can I assist you with today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [messageIdCounter, setMessageIdCounter] = useState(2);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "What products do you sell?",
    "How does shipping work?",
    "What are Nook Miles?",
    "Return policy?",
    "Store hours?"
  ];

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Product-related responses
    if (lowerMessage.includes('product') || lowerMessage.includes('sell') || lowerMessage.includes('item')) {
      return "We offer a wonderful selection of items for your island! Our categories include premium tools, stylish furniture, seasonal clothing, gardening supplies, and exclusive Nook Miles rewards. Check out our products page to see everything available!";
    }

    // Shipping responses
    if (lowerMessage.includes('ship') || lowerMessage.includes('deliver') || lowerMessage.includes('free')) {
      return "Absolutely! We provide free island delivery to any location in the archipelago! Your items will arrive safely and quickly. Most deliveries complete within 1-2 business days, yes yes!";
    }

    // Nook Miles responses
    if (lowerMessage.includes('nook miles') || lowerMessage.includes('points') || lowerMessage.includes('reward')) {
      return "Nook Miles are our special reward points! You earn them with every purchase, and they can be redeemed for exclusive items and discounts. It's my way of saying thank you for being such a valued customer!";
    }

    // Return policy responses
    if (lowerMessage.includes('return') || lowerMessage.includes('refund') || lowerMessage.includes('exchange')) {
      return "Our return policy is very accommodating! You have 30 days to return any item if you change your mind. Just contact us and we'll make it right. Customer satisfaction is very important to me!";
    }

    // Store hours responses
    if (lowerMessage.includes('hour') || lowerMessage.includes('open') || lowerMessage.includes('close') || lowerMessage.includes('time')) {
      return "Our marketplace is open 24/7 online! You can browse and order anytime that's convenient for you. For customer service, I'm available during island business hours: 8 AM to 10 PM island time.";
    }

    // Furniture responses
    if (lowerMessage.includes('furniture') || lowerMessage.includes('chair') || lowerMessage.includes('table') || lowerMessage.includes('decor')) {
      return "Our furniture collection is top-notch! We have everything from cozy chairs to elegant tables and beautiful decorative pieces. Perfect for making your home as stylish as can be, yes yes!";
    }

    // Tools responses
    if (lowerMessage.includes('tool') || lowerMessage.includes('axe') || lowerMessage.includes('shovel') || lowerMessage.includes('net')) {
      return "Our tools are built to last! Whether you need an axe for chopping wood, a shovel for digging, or a net for catching bugs, we have premium quality tools that will serve you well on your island adventures!";
    }

    // Clothing responses
    if (lowerMessage.includes('clothing') || lowerMessage.includes('shirt') || lowerMessage.includes('dress') || lowerMessage.includes('outfit')) {
      return "Looking stylish is important! Our seasonal clothing collection has everything you need to look your best in any weather. From casual island wear to formal outfits, we've got you covered!";
    }

    // Help/greeting responses
    if (lowerMessage.includes('help') || lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('thanks')) {
      return "You're very welcome! I'm always happy to help. Is there anything specific about our products or services you'd like to know more about? I'm here to make your shopping experience as smooth as possible!";
    }

    // Price responses
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive') || lowerMessage.includes('cheap')) {
      return "Our prices are very competitive! We believe in providing great value for quality items. You can find affordable options in every category, and don't forget - you earn Nook Miles with every purchase!";
    }

    // Default response
    return "That's an interesting question! While I might not have a specific answer ready, I'm always learning. Feel free to browse our products or contact our customer service team for more detailed assistance. Is there anything else I can help you with today?";
  };

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend) return;

    // Add user message
    const userMessage: Message = {
      id: messageIdCounter,
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessageIdCounter(prev => prev + 1);

    // Clear input if it was from the text field
    if (!messageText) {
      setInputValue('');
    }

    // Add bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messageIdCounter + 1,
        text: getBotResponse(textToSend),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setMessageIdCounter(prev => prev + 2);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <img src={nookLogo} alt="Tom Nook" className="chatbot-avatar" />
        <div className="chatbot-title">
          <h3>Tom Nook</h3>
          <span>Marketplace Assistant</span>
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              {message.text}
            </div>
            <div className="message-time">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-questions">
        <div className="quick-questions-title">Quick Questions:</div>
        <div className="quick-questions-buttons">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              className="quick-question-btn"
              onClick={() => handleSendMessage(question)}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask Tom Nook anything..."
          className="chat-input"
        />
        <button 
          onClick={() => handleSendMessage()}
          className="send-button"
          disabled={!inputValue.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;