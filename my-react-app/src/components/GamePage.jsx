import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGameById, updateUserInDatabase } from '../server'; // Import a function to fetch a game by ID and update user
import '../styles/GamePage.css';

const GamePage = () => {
    const { id } = useParams(); // Get gameId from URL
    const [gameData, setGameData] = useState(null);
    const [displayedImage, setDisplayedImage] = useState('');
    const [isOwned, setIsOwned] = useState(false); // State to track if the game is owned

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const game = await getGameById(id); // Fetch the game by ID
                setGameData(game);
                setDisplayedImage(game.cover);

                // Check if the user owns this game
                const user = JSON.parse(localStorage.getItem('user'));
                if (user && user.ownedGames.includes(id)) {
                    setIsOwned(true); // Set to true if the user owns the game
                }
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        };

        fetchGame();
    }, [id]);

    const handleAddToCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (!cart.includes(id)) {
            cart.push(id);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Game added to cart!');
        } else {
            alert('Game is already in the cart.');
        }
    };

    const handlePurchase = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && !user.ownedGames.includes(id)) {
                user.ownedGames.push(id);
                await updateUserInDatabase(user); // Update the database
                localStorage.setItem('user', JSON.stringify(user)); // Update localStorage
                setIsOwned(true);
                alert('Game purchased and added to your library!');
            } else {
                alert('You already own this game.');
            }
        } catch (error) {
            console.error('Error purchasing game:', error);
            alert('Failed to purchase game. Please try again.');
        }
    };

    if (!gameData) {
        return <div>Loading...</div>; // Show loading state while fetching data
    }

    const handleThumbnailClick = (mediaUrl) => {
        setDisplayedImage(mediaUrl);
    };

    const handlePlayClick = () => {
        // Handle logic to play the game
        console.log(`Playing ${gameData.title}`);
    };

    return (
      <div className="game-page">
        <div className="game-header">
          <h1>{gameData.title}</h1>
        </div>
        
        <div className="game-content">
          <div className="game-media">
            <div className="game-image">
              <img src={displayedImage} alt={gameData.title} />
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
          
          <div className="game-details">
            <div className="age-rating">
              <span>PEGI 16</span>
              <p>Strong Violence</p>
            </div>
            
            <div className="purchase-info">
              <span>Base Game</span>
              <span className="price">${gameData.price}</span>
              {isOwned ? (
                <button className="play-button" onClick={handlePlayClick}>Play</button>
              ) : (
                <>
                  <button className="pre-purchase" onClick={handlePurchase}>Purchase</button>
                  <button className="pre-purchase" onClick={handleAddToCart}>Add To Cart</button>
                </>
              )}
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
      </div>
    );
};
  
export default GamePage;
