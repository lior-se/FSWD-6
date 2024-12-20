import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getGameById } from "../server"; 
import '../styles/ShopCollection.css'; 

function ShopCollection() {
  const [shop, setShop] = useState(JSON.parse(localStorage.getItem('user'))); 
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (shop && shop.Games) {
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
    } else {
      console.warn("No games found or shop object is null.");
    }
  }, [shop]);

  const handleGameClick = (gameId) => {
    navigate(`/shop/collection/${gameId}`)
};

  return (
    <div className="shop-collection">
      <div className="banner">
        <h1 className="shop-name">{shop.shopname}</h1>
        <button className="add-game-button"
        onClick={() => navigate('/shop/add-game')}
        >
          Add a New Game</button>
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
