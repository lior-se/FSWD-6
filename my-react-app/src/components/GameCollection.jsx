import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getGameById } from "../server";
import '../styles/GameCollection.css'


  function GameCollection() {
    const [games, setGames] = useState([]);
    const [uname,setUsername] = useState();
    const navigate = useNavigate(); 
  
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
              onClick={() => handleGameClick(game._id)} 
            >
              <img src={game.cover} alt={`${game.title} cover`} className="game-cover" />
              <div className="game-info">
                <h2 className="game-title">{game.title}</h2>
                <h3 className="game-developer">{game.developer}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  

export default GameCollection;