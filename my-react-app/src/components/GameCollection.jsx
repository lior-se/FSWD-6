import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getGameById } from "../server";
import '../styles/GameCollection.css'

const gameData = {
    title: "Black Myth: Wukong",
    developer: "Game Science",
    releaseDate: "2024-08-20",
    description: "An action RPG rooted in Chinese mythology...",
    media: ["https://pbs.twimg.com/media/GVRo4VqXMAEI15_.jpg", "https://cdn.mos.cms.futurecdn.net/qmKnEXssAbNKDNq24KRnaM.jpg"],
    cover: "https://i.ytimg.com/vi/1xGiPUeevCM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCfIJcln2crOoZEWxlQiHOqoVpF8g",
    genres: ["Action", "Adventure", "RPG"],
    price: 249,
  };

  function GameCollection() {
    const [games, setGames] = useState([]);
    const [uname,setUsername] = useState();
    const navigate = useNavigate(); // Hook to navigate to different routes
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
  
      if (user && user.ownedGames) {
        const fetchGames = async () => {
          const gamePromises = user.ownedGames.map(gameId => getGameById(gameId));
          const gameData = await Promise.all(gamePromises);
          setGames(gameData);
          setUsername(user.username);
        };
        fetchGames();
      }
    }, []);
  
    const handleGameClick = (gameId) => {
        navigate(`/user/store/${gameId}`)
    };
  
    return (
      <div className="game-collection-page">
        <h1>{uname}'s Game Collection</h1>
        <div className="game-grid">
          {games.map((game, index) => (
            <div 
              key={index} 
              className="game-slot"
              onClick={() => handleGameClick(game._id)} // Handle click to navigate to game page
            >
              <img src={game.cover} alt={`${game.title} cover`} className="game-cover" />
              <div className="game-info">
                <h2 className="game-title">{game.title}</h2>
                <p className="game-developer">{game.developer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  

export default GameCollection;