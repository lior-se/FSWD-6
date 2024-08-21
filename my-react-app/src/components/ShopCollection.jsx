import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getGameById } from "../server"; // Import the function to get game data
import '../styles/ShopCollection.css'; // Create a CSS file for styling

function ShopCollection() {
  const [shop, setShop] = useState(JSON.parse(localStorage.getItem('user'))); // Retrieve the shop data from localStorage
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamePromises = shop.Games.map((gameId) => getGameById(gameId));
        const gamesData = await Promise.all(gamePromises);
        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [shop.Games]);

  const handleGameClick = (gameId) => {
    navigate(`/shop/collection/${gameId}`)
};

  return (
    <div className="shop-collection">
      <div className="banner">
        <h1 className="shop-name">{shop.shopname}</h1>
        <button className="add-game-button">Add a New Game</button>
      </div>
      <div className="shop-games-container">
        {games.map((game) => (
          <div 
            key={game._id} 
            className="shop-game-card"
            onClick={() => handleGameClick(game._id)}
          >
            <img src={game.cover} alt={game.title} className="shop-game-cover" />
            <h3 className="shop-game-title">{game.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopCollection;
