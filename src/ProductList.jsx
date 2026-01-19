import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();

  // UI state
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);

  // ✅ PART-E STEP-3: STATE TO TRACK ADDED PRODUCTS
  const [addedToCart, setAddedToCart] = useState({});

  // ✅ PART-E STEP-4: ADD TO CART HANDLER
  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: 15
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: 12
        }
      ]
    }
  ];

  const styleObj = {
    backgroundColor: '#4CAF50',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '20px',
  };

  const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '1100px',
  };

  const styleA = {
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none',
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <a href="/" onClick={handleHomeClick}>
            <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
          </a>
        </div>

        <div style={styleObjUl}>
          <a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a>
          <a href="#" onClick={handleCartClick} style={styleA}>🛒</a>
        </div>
      </div>

      {/* PRODUCT LIST */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1>{category.category}</h1>

              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="product-image"
                    />

                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-cost">${plant.cost}</div>

                    {/* ✅ PART-E STEP-5: BUTTON WITH STATE */}
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
