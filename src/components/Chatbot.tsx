import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

interface ChatMessage {
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'bot',
      message: 'Hello there! I\'m Tom Nook, yes yes! How can I help you navigate my marketplace today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Product categories
    if (message.includes('tools') || message.includes('tool')) {
      return 'Ah, looking for tools, yes yes! We have premium axes, nets, fishing rods, and more. Visit our Tools section to see the finest equipment for your island adventures!';
    }
    
    if (message.includes('furniture') || message.includes('home') || message.includes('decor')) {
      return 'Excellent choice! Our furniture collection will make your home the envy of every villager, yes yes! From cozy sofas to elegant desks, we have everything to furnish your perfect space.';
    }
    
    if (message.includes('clothes') || message.includes('clothing') || message.includes('fashion')) {
      return 'Fashion-forward, I see! Our clothing collection features the latest seasonal styles. Look your best in any weather, yes yes!';
    }
    
    if (message.includes('garden') || message.includes('plant') || message.includes('flower')) {
      return 'A green thumb, wonderful! Our gardening section has seeds, fertilizers, and beautiful flowers to make your island bloom magnificently!';
    }
    
    // Navigation help
    if (message.includes('navigate') || message.includes('find') || message.includes('where') || message.includes('how')) {
      return 'Navigation help? Of course! Use our main menu to browse categories, or try the search function. The "All Products" page shows everything we have in stock, yes yes!';
    }
    
    // Cart assistance
    if (message.includes('cart') || message.includes('checkout') || message.includes('buy') || message.includes('purchase')) {
      return 'Ready to make a purchase? Wonderful! Add items to your cart and proceed to checkout. We accept all forms of payment, including Bells and Nook Miles, yes yes!';
    }
    
    // Shipping and delivery
    if (message.includes('shipping') || message.includes('delivery') || message.includes('ship')) {
      return 'We offer free island delivery to anywhere in the archipelago! Orders typically arrive within 1-2 island days. Fast and reliable service, yes yes!';
    }
    
    // Returns and policies
    if (message.includes('return') || message.includes('refund') || message.includes('policy')) {
      return 'Changed your mind? No problem! We offer easy returns within 30 days. Customer satisfaction is our priority, yes yes!';
    }
    
    // Nook Miles
    if (message.includes('nook miles') || message.includes('miles') || message.includes('points') || message.includes('rewards')) {
      return 'Ah, Nook Miles! Earn points with every purchase and redeem them for special items. It\'s our way of saying thank you for your business, yes yes!';
    }
    
    // Store hours and availability
    if (message.includes('hours') || message.includes('open') || message.includes('available') || message.includes('when')) {
      return 'We\'re open 24/7 for your convenience! The online marketplace never sleeps, just like my dedication to customer service, yes yes!';
    }
    
    // Pricing questions
    if (message.includes('price') || message.includes('cost') || message.includes('expensive') || message.includes('cheap')) {
      return 'Fair pricing is important to me, yes yes! All our prices are clearly listed, and we often have special deals. Quality items at reasonable prices!';
    }
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello there! It\'s always a pleasure to help a valued customer. What can I assist you with today, yes yes?';
    }
    
    // Thanks
    if (message.includes('thank') || message.includes('thanks')) {
      return 'You\'re most welcome! Happy to help anytime. Remember, customer satisfaction is the foundation of good business, yes yes!';
    }
    
    // Quality questions
    if (message.includes('quality') || message.includes('good') || message.includes('best')) {
      return 'Quality is our guarantee! Every item is carefully selected to meet Nook Inc. standards. Only the finest goods make it to our shelves, yes yes!';
    }
    
    // Help or assistance
    if (message.includes('help') || message.includes('assist') || message.includes('support')) {
      return 'I\'m here to help! Ask me about our products, navigation, cart assistance, shipping, or anything else about the marketplace, yes yes!';
    }
    
    // Default fallback responses with Tom Nook personality
    const fallbackResponses = [
      'Hmm, I\'m not quite sure about that, yes yes! Could you try asking about our products, shipping, or store policies?',
      'That\'s an interesting question! I specialize in marketplace matters - try asking about tools, furniture, clothing, or how to navigate our store, yes yes!',
      'I want to help, but I didn\'t quite understand. Feel free to ask about our product categories, cart assistance, or store information, yes yes!',
      'My expertise is in running this fine marketplace! Ask me about our items, shipping policies, or how to find what you\'re looking for, yes yes!',
      'Business is good, but I need more details to help you properly! Try asking about specific products or store services, yes yes!'
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      type: 'user',
      message: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        type: 'bot',
        message: getBotResponse(inputValue.trim()),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      {/* Floating Chat Button */}
      <button
        className={`chat-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-info">
            <h3>Tom Nook Assistant</h3>
            <span className="chat-status">● Online</span>
          </div>
          <button
            className="chat-close-btn"
            onClick={toggleChat}
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message-line ${msg.type}`}>
              <span className="message-prefix">
                {msg.type === 'user' ? '> ' : 'Tom Nook: '}
              </span>
              <span className="message-text">{msg.message}</span>
            </div>
          ))}
          
          {isTyping && (
            <div className="message-line bot typing">
              <span className="message-prefix">Tom Nook: </span>
              <span className="message-text">
                <span className="typing-indicator">
                  <span></span><span></span><span></span>
                </span>
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Tom Nook anything..."
            className="chat-input"
            disabled={isTyping}
          />
          <button
            type="submit"
            className="chat-submit-btn"
            disabled={!inputValue.trim() || isTyping}
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;