import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Product } from './types';

// Pages
import HomePage from './pages/HomePage';
import AllProductsPage from './pages/AllProductsPage';
import ToolsPage from './pages/ToolsPage';
import FurniturePage from './pages/FurniturePage';
import ClothingPage from './pages/ClothingPage';
import TurnipPricesPage from './pages/TurnipPricesPage';
import TeamPage from './pages/TeamPage';

// Import CSS for placeholders
import './pages/PlaceholderStyles.css';

const App: React.FC = () => {
  const [products] = useState<Product[]>([
    { id: 1, name: "Leaf Umbrella", price: 300, image: require('./images/Leaf_Umbrella_NH_Icon.png'), category: "tools" },
    { id: 2, name: "Fishing Rod", price: 400, image: require('./images/Fishing_Rod_(Blue)_NH_Icon.png'), category: "tools" },
    { id: 3, name: "Net", price: 400, image: require('./images/Net_(Red)_NH_Icon.png'), category: "tools" },
    { id: 4, name: "Shovel", price: 600, image: require('./images/Shovel_(Red)_NH_Icon.png'), category: "tools" },
    { id: 5, name: "Ladder", price: 500, image: require('./images/Ladder_NH_Icon.png'), category: "tools" },
    { id: 6, name: "Slingshot", price: 800, image: require('./images/Slingshot_(Red)_NH_Icon.png'), category: "tools" },
    { id: 7, name: "Axe", price: 500, image: require('./images/Axe_NH_Icon.png'), category: "tools" },
    { id: 8, name: "Golden Axe", price: 2500, image: require('./images/Golden_Axe_NH_Icon.png'), category: "tools" },
    { id: 9, name: "Golden Net", price: 2500, image: require('./images/Golden_Net_NH_Icon.png'), category: "tools" },
    { id: 10, name: "Watering Can", price: 450, image: require('./images/Watering_Can_(Blue)_NH_Icon.png'), category: "tools" }
  ]);

  // Filter products by category
  const toolProducts = products.filter(product => product.category === "tools");

  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          {/* Use a render prop for home route to apply special class */}
          <Route path="/" element={
            <main className="content-container home-content">
              <HomePage />
            </main>
          } />
          {/* Use standard container for other routes */}
          <Route path="/products" element={
            <main className="content-container">
              <AllProductsPage products={products} />
            </main>
          } />
          <Route path="/tools" element={
            <main className="content-container">
              <ToolsPage products={toolProducts} />
            </main>
          } />
          <Route path="/furniture" element={
            <main className="content-container">
              <FurniturePage />
            </main>
          } />
          <Route path="/clothing" element={
            <main className="content-container">
              <ClothingPage />
            </main>
          } />
          <Route path="/turnip-prices" element={
            <main className="content-container">
              <TurnipPricesPage />
            </main>
          } />
          <Route path="/team" element={
            <main className="content-container">
              <TeamPage />
            </main>
          } />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
