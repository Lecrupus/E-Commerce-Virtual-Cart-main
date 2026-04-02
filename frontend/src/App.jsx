import React, { useState } from "react";
import "./App.css"; 

const MOCK_GROCERIES = [
  { id: 1, name: "Banana", price: 0.99 },
  { id: 2, name: "Organic Hass Avocado", price: 2.49 },
  { id: 3, name: "Limes", price: 0.50 },
  { id: 4, name: "Organic Garlic", price: 1.20 },
  { id: 5, name: "Sparkling Water Grapefruit", price: 4.99 },
  { id: 6, name: "Organic Strawberries", price: 3.99 },
  { id: 7, name: "Half & Half", price: 2.99 },
  { id: 8, name: "Carrots", price: 1.99 },
  { id: 9, name: "Organic Fuji Apple", price: 4.66 },
  { id: 10, name: "Organic Grape Tomatoes", price: 2.84 },
  { id: 11, name: "Organic Navel Orange", price: 5.03 },
  { id: 12, name: "Organic Baby Arugula", price: 4.12 },
  { id: 13, name: "Apple Honeycrisp Organic", price: 6.86 },
  { id: 14, name: "Bag of Organic Bananas", price: 4.12 },
  { id: 15, name: "Seedless Red Grapes", price: 1.82 },
  { id: 16, name: "Blueberries", price: 2.15 },
  { id: 17, name: "Organic Blackberries", price: 4.57 },
  { id: 18, name: "Organic Tomato Cluster", price: 2.31 },
  { id: 19, name: "Organic DAnjou Pears", price: 6.55 },
  { id: 20, name: "Michigan Organic Kale", price: 4.10 },
  { id: 21, name: "Red Peppers", price: 1.92 },
  { id: 22, name: "Organic Unsweetened Almond Milk", price: 1.56 },
  { id: 23, name: "Organic Small Bunch Celery", price: 6.11 },
  { id: 24, name: "Small Hass Avocado", price: 5.05 },
  { id: 25, name: "Organic Yellow Onion", price: 4.36 },
  { id: 26, name: "Red Vine Tomato", price: 4.25 },
  { id: 27, name: "Organic Avocado", price: 5.64 },
  { id: 28, name: "Organic Gala Apples", price: 2.50 },
  { id: 29, name: "Organic Cilantro", price: 2.12 },
  { id: 30, name: "Organic Whole String Cheese", price: 3.48 },
  { id: 31, name: "Yellow Onions", price: 4.62 },
  { id: 32, name: "Organic Blueberries", price: 4.02 },
  { id: 33, name: "Original Hummus", price: 6.28 },
  { id: 34, name: "Organic Red Onion", price: 6.78 },
  { id: 35, name: "Organic Baby Carrots", price: 5.62 },
  { id: 36, name: "Lime Sparkling Water", price: 5.39 },
  { id: 37, name: "Organic Raspberries", price: 5.55 },
  { id: 38, name: "Strawberries", price: 2.63 },
  { id: 39, name: "Organic Cucumber", price: 2.92 },
  { id: 40, name: "Broccoli Crown", price: 2.71 },
  { id: 41, name: "100% Whole Wheat Bread", price: 3.45 },
  { id: 42, name: "Fresh Cauliflower", price: 4.22 },
  { id: 43, name: "Large Lemon", price: 4.35 },
  { id: 44, name: "Organic Baby Spinach", price: 5.65 },
  { id: 45, name: "Organic Zucchini", price: 4.44 },
  { id: 46, name: "Organic Kiwi", price: 4.97 },
  { id: 47, name: "Organic Peeled Whole Baby Carrots", price: 3.24 },
  { id: 48, name: "Organic Lemon", price: 4.17 },
  { id: 49, name: "Organic Large Extra Fancy Fuji Apple", price: 5.40 },
  { id: 50, name: "Boneless Skinless Chicken Breasts", price: 3.47 },
  { id: 51, name: "Organic Whole Milk", price: 4.60 },
  { id: 52, name: "Honeycrisp Apple", price: 4.42 },
  { id: 53, name: "Cucumber Kirby", price: 6.08 },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  const handleAddToCart = async (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setLastAddedItem(product.name);
    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/recommend?item=${product.name}`);
      const data = await response.json();
      
      if (data.success && data.recommendations.length > 0) {
        setRecommendations(data.recommendations);
      } else {
        setRecommendations([]); 
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecommendationToCart = (itemName) => {
    const existingProduct = MOCK_GROCERIES.find(p => p.name === itemName);
    
    const productToAdd = existingProduct || {
      id: Math.random(), 
      name: itemName,
      price: 2.99 
    };

    handleAddToCart(productToAdd);
  };

  // NEW: Function to remove an item from the cart using its specific index
  const handleRemoveFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
    
    // Optional: If cart becomes empty, clear the recommendations
    if (cart.length === 1) {
      setRecommendations([]);
      setLastAddedItem(null);
    }
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="page-wrapper">
      <header className="header">
        <h1>Data Mining Project</h1>
      </header>

      <div className="container">
        
        {/* LEFT SIDE: Grid Layout */}
        <div className="main-content">
          <h2 className="section-title">Available Datasets / Items</h2>
          <div className="grid">
            {MOCK_GROCERIES.map((item) => (
              <div key={item.id} className="card">
                <div className="item-placeholder">
                  {item.name.charAt(0)}
                </div>
                <h4 className="product-name">{item.name}</h4>
                <p className="product-price">${item.price.toFixed(2)}</p>
                <button onClick={() => handleAddToCart(item)} className="add-btn">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Sidebar for Cart & instant Suggestions */}
        <div className="sidebar">
          <h3>Your Cart ({cart.length})</h3>
          
          {cart.length === 0 ? (
            <p className="empty-text">Cart is currently empty.</p>
          ) : (
            <>
              <ul className="cart-list">
                {cart.map((item, index) => (
                  <li key={index} className="cart-item">
                    <span>{item.name}</span>
                    
                    {/* NEW: Updated layout to include the remove button next to the price */}
                    <div className="cart-item-right">
                      <span>${item.price.toFixed(2)}</span>
                      <button 
                        className="remove-btn" 
                        onClick={() => handleRemoveFromCart(index)}
                        title="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </>
          )}

          {/* AI Recommendations Section */}
          <div className="recommendation-section">
            <h3>FP-Growth Recommendations</h3>
            
            {loading ? (
              <p className="loading-text">Mining association rules...</p>
            ) : recommendations.length > 0 ? (
              <div>
                <p className="empty-text" style={{margin: "10px 0"}}>
                  Based on <strong>{lastAddedItem}</strong>, users also bought:
                </p>
                <div className="rec-list">
                  {recommendations.map((rec, index) => (
                    <button 
                      key={index} 
                      className="rec-card"
                      onClick={() => handleAddRecommendationToCart(rec)}
                    >
                      <span>+ {rec}</span>
                      <span className="add-badge">Add</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="empty-text" style={{marginTop: "10px"}}>
                Add an item to generate cross-selling suggestions.
              </p>
            )}
          </div>

        </div>
      </div>

      <footer className="footer">
        <p>Data Mining Project</p>
      </footer>
    </div>
  );
}