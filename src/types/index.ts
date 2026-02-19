export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface TurnipPrice {
  day: string;
  am: number;
  pm: number;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}
