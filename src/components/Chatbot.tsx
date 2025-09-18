import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {}

const Chatbot: React.FC<ChatbotProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Tom Nook responses
  const responses = {
    greeting: [
      "Yes, yes! Welcome to Tom Nook's Marketplace! How can I help you today?",
      "Ah, hello there! Looking for something special for your island, yes, yes?",
      "Welcome, welcome! Tom Nook at your service. What brings you to my marketplace today?"
    ],
    products: [
      "We have the finest selection of tools, furniture, and clothing! Browse our categories to find exactly what you need, yes, yes!",
      "Our inventory includes premium tools, stylish furniture, and seasonal clothing. All guaranteed to enhance your island life!",
      "From golden axes to cozy furniture sets, we have everything an island dweller could want!"
    ],
    turnips: [
      "Ah, the turnip market! Today's prices are looking quite favorable, yes, yes! Check our Turnip Prices page for the latest rates.",
      "Smart thinking about turnips! The market fluctuates daily, so be sure to check our dedicated Turnip Prices section!",
      "Turnips are a wonderful investment! Visit our Turnip Prices page to see today's buying and selling rates."
    ],
    nookMiles: [
      "Nook Miles are our premium currency! You can earn them with every purchase and use them for exclusive items!",
      "Our Nook Miles program offers fantastic rewards! Special furniture and exclusive items await dedicated customers!",
      "Yes, yes! Nook Miles make shopping even more rewarding. Check out our exclusive Nook Miles catalog!"
    ],
    help: [
      "Of course! You can browse by categories like Tools, Furniture, or Clothing. Need anything specific, yes, yes?",
      "I'm here to help! Try asking about our products, turnip prices, or Nook Miles rewards!",
      "Certainly! Feel free to ask about our inventory, delivery options, or anything else about the marketplace!"
    ],
    delivery: [
      "We offer free island delivery on all orders! Your items will arrive via Dodo Airlines express service, yes, yes!",
      "Delivery is complimentary to any island in the archipelago! We use the finest Dodo Airlines shipping methods.",
      "All orders include free shipping! Tom Nook guarantees safe delivery to your island doorstep!"
    ],
    thanks: [
      "You're very welcome! It's my pleasure to help, yes, yes!",
      "Think nothing of it! Tom Nook is always happy to assist valued customers!",
      "My pleasure entirely! Don't hesitate to ask if you need anything else!"
    ],
    default: [
      "Hmm, that's an interesting question! Perhaps you'd like to browse our product categories or ask about turnip prices?",
      "I'm not quite sure about that, but I'm happy to help with shopping, turnips, or Nook Miles! What interests you most?",
      "Yes, yes! While I ponder that, might I suggest checking out our featured items or turnip market updates?"
    ]
  };

  const getResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    }
    
    if (lowerInput.includes('product') || lowerInput.includes('item') || lowerInput.includes('shop') || lowerInput.includes('buy')) {
      return responses.products[Math.floor(Math.random() * responses.products.length)];
    }
    
    if (lowerInput.includes('turnip') || lowerInput.includes('price')) {
      return responses.turnips[Math.floor(Math.random() * responses.turnips.length)];
    }
    
    if (lowerInput.includes('nook miles') || lowerInput.includes('reward') || lowerInput.includes('points')) {
      return responses.nookMiles[Math.floor(Math.random() * responses.nookMiles.length)];
    }
    
    if (lowerInput.includes('help') || lowerInput.includes('how') || lowerInput.includes('what')) {
      return responses.help[Math.floor(Math.random() * responses.help.length)];
    }
    
    if (lowerInput.includes('deliver') || lowerInput.includes('shipping') || lowerInput.includes('ship')) {
      return responses.delivery[Math.floor(Math.random() * responses.delivery.length)];
    }
    
    if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
      return responses.thanks[Math.floor(Math.random() * responses.thanks.length)];
    }
    
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  };

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

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Add welcome message when first opened
      const welcomeMessage: Message = {
        id: Date.now(),
        text: "Yes, yes! Welcome to Tom Nook's Marketplace! How can I help you find what you're looking for today?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Tom Nook typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window" role="dialog" aria-label="Tom Nook Chat Assistant">
          <div className="chatbot-header">
            <div className="chatbot-avatar">🦝</div>
            <div className="chatbot-info">
              <h3>Tom Nook</h3>
              <span className="chatbot-status">Online</span>
            </div>
            <button 
              className="chatbot-close"
              onClick={handleToggleChat}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.isUser ? 'user' : 'bot'}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot typing">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  Tom Nook is typing...
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Tom Nook about the marketplace..."
              aria-label="Type your message"
            />
            <button 
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ''}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={handleToggleChat}
        aria-label={isOpen ? 'Close chat with Tom Nook' : 'Chat with Tom Nook'}
      >
        {isOpen ? '✕' : '🦝'}
        {!isOpen && <span className="chat-badge">Chat with Tom Nook!</span>}
      </button>
    </div>
  );
};

export default Chatbot;