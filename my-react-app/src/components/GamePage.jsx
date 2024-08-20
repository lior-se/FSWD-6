import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGameById } from '../server'; // Import a function to fetch a game by ID
import '../styles/GamePage.css';

const GamePage = () => {
    const { id } = useParams(); // Get gameId from URL
    const [gameData, setGameData] = useState(null);
    const [displayedImage, setDisplayedImage] = useState('');

    useEffect(() => {
        const fetchGame = async () => {
            try {
              console.log("ID du gamepage")
              console.log(id)
                const game = await getGameById(id); // Fetch the game by ID
                setGameData(game);
                setDisplayedImage(game.cover);
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        };

        fetchGame();
    }, [id]);

    if (!gameData) {
        return <div>Loading...</div>; // Show loading state while fetching data
    }

    const handleThumbnailClick = (mediaUrl) => {
        setDisplayedImage(mediaUrl);
    };

    return (
      <div className="game-page">
        <div className="game-header">
          <h1>{gameData.title}</h1>
        </div>
        
        <div className="game-content">
          <div className="game-image">
            <img src={displayedImage} alt={gameData.title} />
          </div>
          
          <div className="game-details">
            <div className="age-rating">
              <span>PEGI 16</span>
              <p>Strong Violence</p>
            </div>
            
            <div className="purchase-info">
              <span>Base Game</span>
              <span className="price">${gameData.price}</span>
              <button className="pre-purchase">Pre-Purchase</button>
              <button>Add To Cart</button>
              <button>Add to Wishlist</button>
            </div>
  
            <div className="meta-info">
              <p>Developer: {gameData.developer}</p>
              <p>Release Date: {gameData.releaseDate}</p>
            </div>
  
            <div className="features">
              <span>Cloud Saves</span>
              <span>Controller Support</span>
              <span>Single Player</span>
            </div>

            <div className="thumbnails">
              <img 
                src={gameData.cover} 
                alt="Cover" 
                onClick={() => handleThumbnailClick(gameData.cover)}
                className={displayedImage === gameData.cover ? 'active' : ''}
              />
              {gameData.media.map((mediaUrl, index) => (
                <img 
                  key={index} 
                  src={mediaUrl} 
                  alt={`Screenshot ${index + 1}`} 
                  onClick={() => handleThumbnailClick(mediaUrl)}
                  className={displayedImage === mediaUrl ? 'active' : ''}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="game-description">
          <p>{gameData.description}</p>
          <div className="genres">
            {gameData.genres.map((genre, index) => (
              <span key={index}>{genre}</span>
            ))}
          </div>
        </div>
        
      </div>
    );
};
  
export default GamePage;
