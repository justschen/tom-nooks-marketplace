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
import GardeningPage from './pages/GardeningPage';
import NookMilesPage from './pages/NookMilesPage';
import TurnipPricesPage from './pages/TurnipPricesPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';

// Import CSS for placeholders
import './pages/PlaceholderStyles.css';

const App: React.FC = () => {
  const [products] = useState<Product[]>([
    // Tools products
    { id: 1, name: "Leaf Umbrella", price: 300, image: require('./images/tools/Leaf_Umbrella_NH_Icon.png'), category: "tools" },
    { id: 2, name: "Fishing Rod", price: 400, image: require('./images/tools/Fishing_Rod_(Blue)_NH_Icon.png'), category: "tools" },
    { id: 3, name: "Net", price: 400, image: require('./images/tools/Net_(Red)_NH_Icon.png'), category: "tools" },
    { id: 4, name: "Shovel", price: 600, image: require('./images/tools/Shovel_(Red)_NH_Icon.png'), category: "tools" },
    { id: 5, name: "Ladder", price: 500, image: require('./images/tools/Ladder_NH_Icon.png'), category: "tools" },
    { id: 6, name: "Slingshot", price: 800, image: require('./images/tools/Slingshot_(Red)_NH_Icon.png'), category: "tools" },
    { id: 7, name: "Axe", price: 500, image: require('./images/tools/Axe_NH_Icon.png'), category: "tools" },
    { id: 8, name: "Golden Axe", price: 2500, image: require('./images/tools/Golden_Axe_NH_Icon.png'), category: "tools" },
    { id: 9, name: "Golden Net", price: 2500, image: require('./images/tools/Golden_Net_NH_Icon.png'), category: "tools" },
    { id: 10, name: "Watering Can", price: 450, image: require('./images/tools/Watering_Can_(Blue)_NH_Icon.png'), category: "tools" },
    
    // Clothing products
    { id: 11, name: "Acid-Washed Jacket", price: 1200, image: require('./images/clothes/240px-Acid-Washed_Jacket_(Black)_NH_Icon.png'), category: "clothing" },
    { id: 12, name: "Annyeong Tee", price: 640, image: require('./images/clothes/240px-Annyeong_Tee_NH_Icon.png'), category: "clothing" },
    { id: 13, name: "Argyle Sweater", price: 880, image: require('./images/clothes/240px-Argyle_Sweater_(Green)_NH_Icon.png'), category: "clothing" },
    { id: 14, name: "Athletic Jacket", price: 960, image: require('./images/clothes/240px-Athletic_Jacket_(Red)_NH_Icon.png'), category: "clothing" },
    { id: 15, name: "Basketball Tank", price: 800, image: require('./images/clothes/240px-Basketball_Tank_(Purple)_NH_Icon.png'), category: "clothing" },
    { id: 16, name: "Cavalier Shirt", price: 1050, image: require('./images/clothes/240px-Cavalier_Shirt_(Blue)_NH_Icon.png'), category: "clothing" },
    { id: 17, name: "Coatigan", price: 1400, image: require('./images/clothes/240px-Coatigan_(Gray)_NH_Icon.png'), category: "clothing" },
    { id: 18, name: "Down Jacket", price: 1120, image: require('./images/clothes/240px-Down_Jacket_(Green)_NH_Icon.png'), category: "clothing" },
    { id: 19, name: "Dreamy Sweater", price: 1200, image: require('./images/clothes/240px-Dreamy_Sweater_(Pink)_NH_Icon.png'), category: "clothing" },
    { id: 20, name: "Fitness Tank", price: 640, image: require('./images/clothes/240px-Fitness_Tank_(Mint)_NH_Icon.png'), category: "clothing" },
    { id: 21, name: "Heart Apron", price: 840, image: require('./images/clothes/240px-Heart_Apron_(Pink)_NH_Icon.png'), category: "clothing" },
    { id: 22, name: "Letter Jacket", price: 1000, image: require('./images/clothes/240px-Letter_Jacket_(Blue)_NH_Icon.png'), category: "clothing" },
    { id: 23, name: "Mom's Handmade Apron", price: 2400, image: require('./images/clothes/240px-Mom\'s_Handmade_Apron_(M)_NH_Icon.png'), category: "clothing" },
    { id: 24, name: "Moldy Dress", price: 200, image: require('./images/clothes/240px-Moldy_Dress_NH_Icon.png'), category: "clothing" },
    { id: 25, name: "No. 1 Shirt", price: 560, image: require('./images/clothes/240px-No._1_Shirt_NH_Icon.png'), category: "clothing" },
    { id: 26, name: "Tailcoat", price: 2500, image: require('./images/clothes/240px-Tailcoat_(White)_NH_Icon.png'), category: "clothing" },
    { id: 27, name: "Tie-Dye Shirt", price: 720, image: require('./images/clothes/240px-Tie-Dye_Shirt_NH_Icon.png'), category: "clothing" },
    { id: 28, name: "Two-Ball Tee", price: 640, image: require('./images/clothes/240px-Two-Ball_Tee_NH_Icon.png'), category: "clothing" },
    
    // Furniture products
    { id: 29, name: "Afternoon-Tea Set", price: 1200, image: require('./images/furniture/Afternoon-Tea_Set_(Silver)_NH_Icon.png'), category: "furniture" },
    { id: 30, name: "Antique Wardrobe", price: 10000, image: require('./images/furniture/Antique_Wardrobe_(Brown)_NH_Icon.png'), category: "furniture" },
    { id: 31, name: "Arcade Combat Game", price: 5700, image: require('./images/furniture/Arcade_Combat_Game_NH_Icon.png'), category: "furniture" },
    { id: 32, name: "Baby Bear", price: 1800, image: require('./images/furniture/Baby_Bear_(Cream_-_None)_NH_Icon.png'), category: "furniture" },
    { id: 33, name: "Bonfire", price: 720, image: require('./images/furniture/Bonfire_NH_Icon.png'), category: "furniture" },
    { id: 34, name: "Bulldozer", price: 12000, image: require('./images/furniture/Bulldozer_(Yellow)_NH_Icon.png'), category: "furniture" },
    { id: 35, name: "Chalkboard", price: 2600, image: require('./images/furniture/Chalkboard_(Blank)_NH_Icon.png'), category: "furniture" },
    { id: 36, name: "Cool Sofa", price: 4300, image: require('./images/furniture/Cool_Sofa_(Silver_-_Black)_NH_Icon.png'), category: "furniture" },
    { id: 37, name: "Corkboard", price: 1200, image: require('./images/furniture/Corkboard_(Natural_-_Apple)_NH_Icon.png'), category: "furniture" },
    { id: 38, name: "Den Chair", price: 1500, image: require('./images/furniture/Den_Chair_(Black)_NH_Icon.png'), category: "furniture" },
    { id: 39, name: "Desktop Computer", price: 10000, image: require('./images/furniture/Desktop_Computer_(Black_-_Desktop)_NH_Icon.png'), category: "furniture" },
    { id: 40, name: "Lucky Cat", price: 2400, image: require('./images/furniture/Lucky_Cat_(White)_NH_Icon.png'), category: "furniture" },
    { id: 41, name: "Monster Statue", price: 5000, image: require('./images/furniture/Monster_Statue_(Brown)_NH_Icon.png'), category: "furniture" },
    { id: 42, name: "Plaza Merry-Go-Round", price: 8000, image: require('./images/furniture/Plaza_Merry-Go-Round_(Vivid)_NH_Icon.png'), category: "furniture" },
    { id: 43, name: "Retro Massage Chair", price: 3200, image: require('./images/furniture/Retro_Massage_Chair_NH_Icon.png'), category: "furniture" },
    { id: 44, name: "Sewing Project", price: 430, image: require('./images/furniture/Sewing_Project_(Yellow)_NH_Icon.png'), category: "furniture" },
    { id: 45, name: "Shaded Pendant Lamp", price: 1300, image: require('./images/furniture/Shaded_Pendant_Lamp_(White)_NH_Icon.png'), category: "furniture" },
    { id: 46, name: "Simple DIY Workbench", price: 580, image: require('./images/furniture/Simple_DIY_Workbench_NH_Icon.png'), category: "furniture" },
    { id: 47, name: "Torii", price: 20000, image: require('./images/furniture/Torii_(Vermilion_-_Text)_NH_Icon.png'), category: "furniture" },
    { id: 48, name: "Wooden Simple Bed", price: 2800, image: require('./images/furniture/Wooden_Simple_Bed_(Light_Wood_-_Orange)_NH_Icon.png'), category: "furniture" },
    
    // Gardening products
    { id: 49, name: "Red Tulip Bag", price: 240, image: require('./images/gardening/Flower_Bag_NH_Icon.png'), category: "gardening" },
    { id: 50, name: "Yellow Tulip Bag", price: 240, image: require('./images/gardening/Flower_Bag_NH_Icon.png'), category: "gardening" },
    { id: 51, name: "White Tulip Bag", price: 240, image: require('./images/gardening/Flower_Bag_NH_Icon.png'), category: "gardening" },
    { id: 52, name: "Red Rose Bag", price: 240, image: require('./images/gardening/Flower_Bag_NH_Icon.png'), category: "gardening" },
    { id: 53, name: "Yellow Rose Bag", price: 240, image: require('./images/gardening/Flower_Bag_NH_Icon.png'), category: "gardening" },
    { id: 54, name: "White Rose Bag", price: 240, image: require('./images/gardening/Flower_Bag_NH_Icon.png'), category: "gardening" },
    { id: 55, name: "Mini-Cactus Set", price: 1000, image: require('./images/gardening/Mini-Cactus_Set_NH_Icon.png'), category: "gardening" },
    { id: 56, name: "Cherry-Blossom Bonsai", price: 4500, image: require('./images/gardening/Cherry-Blossom_Bonsai_NH_Icon.png'), category: "gardening" },
    { id: 57, name: "Evergreen Ash", price: 3200, image: require('./images/gardening/Evergreen_Ash_(Red)_NH_Icon.png'), category: "gardening" },
    { id: 58, name: "Paradise Planning Planter", price: 2400, image: require('./images/gardening/Paradise_Planning_Planter_NH_Icon.png'), category: "gardening" },
    { id: 59, name: "Fan Palm", price: 1800, image: require('./images/gardening/Fan_Palm_(Black)_NH_Icon.png'), category: "gardening" },
    { id: 60, name: "Potted Starter Plants", price: 840, image: require('./images/gardening/Potted_Starter_Plants_(Black)_NH_Icon.png'), category: "gardening" },
    
    // Nook Miles products
    { id: 61, name: "Nook Miles Ticket", price: 2000, image: require('./images/nook-miles/nook-special/Nook_Miles_Ticket_NH_Icon.png'), category: "nook-miles" },
    { id: 62, name: "Bell Voucher", price: 500, image: require('./images/nook-miles/nook-special/Bell_Voucher_NH_Icon.png'), category: "nook-miles" },
    { id: 63, name: "DIY Recipes+", price: 3000, image: require('./images/nook-miles/Nook_Miles_NH_Icon.png'), category: "nook-miles" },
    { id: 64, name: "Custom Design Pro Editor", price: 1800, image: require('./images/nook-miles/nook-special/Custom_Design_Pro_Editor_NH_Inv_Icon.png'), category: "nook-miles" },
    { id: 65, name: "Phone Case Kit", price: 800, image: require('./images/nook-miles/nook-special/Customizable_Phone_Case_Kit_NH_Icon.png'), category: "nook-miles" },
    { id: 66, name: "ABD", price: 9900, image: require('./images/nook-miles/nook-funiture/ABD_(Silver)_NH_Icon.png'), category: "nook-miles" },
    { id: 67, name: "Drink Machine", price: 2000, image: require('./images/nook-miles/nook-funiture/Drink_Machine_(Red_-_Orange_Juice)_NH_Icon.png'), category: "nook-miles" },
    { id: 68, name: "Snack Machine", price: 2000, image: require('./images/nook-miles/nook-funiture/Snack_Machine_(Black)_NH_Icon.png'), category: "nook-miles" },
    { id: 69, name: "Public Bench", price: 2000, image: require('./images/nook-miles/nook-funiture/Public_Bench_(Blue)_NH_Icon.png'), category: "nook-miles" },
    { id: 70, name: "Parabolic Antenna", price: 4000, image: require('./images/nook-miles/nook-funiture/Parabolic_Antenna_(Plain)_NH_Icon.png'), category: "nook-miles" },
    { id: 71, name: "Wind Turbine", price: 4000, image: require('./images/nook-miles/nook-funiture/Wind_Turbine_(Blue)_NH_Icon.png'), category: "nook-miles" },
    { id: 72, name: "Volleyball Net", price: 3000, image: require('./images/nook-miles/nook-funiture/Volleyball_Net_(Red)_NH_Icon.png'), category: "nook-miles" },
    { id: 73, name: "Robot Hero", price: 5000, image: require('./images/nook-miles/nook-funiture/Robot_Hero_NH_DIY_Icon.png'), category: "nook-miles" },
    { id: 74, name: "Nook Inc. Aloha Shirt", price: 800, image: require('./images/nook-miles/nook-clothes/240px-Nook_Inc._Aloha_Shirt_NH_Icon.png'), category: "nook-miles" },
    { id: 75, name: "Green Nook Inc. Aloha Shirt", price: 800, image: require('./images/nook-miles/nook-clothes/Green_Nook_Inc._Aloha_Shirt_NH_Icon.png'), category: "nook-miles" },
    { id: 76, name: "Coral Nook Inc. Aloha Shirt", price: 800, image: require('./images/nook-miles/nook-clothes/240px-Coral_Nook_Inc._Aloha_Shirt_NH_Icon.png'), category: "nook-miles" },
    { id: 77, name: "Nook Inc. Bandanna", price: 600, image: require('./images/nook-miles/nook-clothes/Nook_Inc._Bandanna_NH_Icon.png'), category: "nook-miles" },
    { id: 78, name: "Nook Inc. Blouson", price: 1000, image: require('./images/nook-miles/nook-clothes/Nook_Inc._Blouson_NH_Icon.png'), category: "nook-miles" },
    { id: 79, name: "Nook Inc. Cap", price: 600, image: require('./images/nook-miles/nook-clothes/Nook_Inc._Cap_NH_Icon.png'), category: "nook-miles" },
    { id: 80, name: "Nook Inc. Tee", price: 800, image: require('./images/nook-miles/nook-clothes/Nook_Inc._Tee_NH_Icon.png'), category: "nook-miles" },
    { id: 81, name: "Nook Inc. Umbrella", price: 700, image: require('./images/nook-miles/nook-clothes/Nook_Inc._Umbrella_NH_Icon.png'), category: "nook-miles" },
    { id: 82, name: "Nook Inc. Wet Suit", price: 3000, image: require('./images/nook-miles/nook-clothes/Nook_Inc._Wet_Suit_NH_Icon.png'), category: "nook-miles" },
  ]);

  // Filter products by category
  const toolProducts = products.filter(product => product.category === "tools");
  const clothingProducts = products.filter(product => product.category === "clothing");
  const furnitureProducts = products.filter(product => product.category === "furniture");
  const gardeningProducts = products.filter(product => product.category === "gardening");
  const nookMilesProducts = products.filter(product => product.category === "nook-miles");

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
              <AllProductsPage products={products.filter(product => product.category !== "nook-miles")} />
            </main>
          } />
          <Route path="/tools" element={
            <main className="content-container">
              <ToolsPage products={toolProducts} />
            </main>
          } />
          <Route path="/furniture" element={
            <main className="content-container">
              <FurniturePage products={furnitureProducts} />
            </main>
          } />
          <Route path="/clothing" element={
            <main className="content-container">
              <ClothingPage products={clothingProducts} />
            </main>
          } />
          <Route path="/gardening" element={
            <main className="content-container">
              <GardeningPage products={gardeningProducts} />
            </main>
          } />
          <Route path="/nook-stop" element={
            <main className="content-container">
              <NookMilesPage products={nookMilesProducts} />
            </main>
          } />
          <Route path="/turnip-prices" element={
            <main className="content-container turnip-content">
              <TurnipPricesPage />
            </main>
          } />
          <Route path="/team" element={
            <main className="content-container team-content">
              <TeamPage />
            </main>
          } />
          <Route path="/contact" element={
            <main className="content-container contact-content">
              <ContactPage />
            </main>
          } />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
