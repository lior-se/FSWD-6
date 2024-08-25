import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGame,updateShopGames } from '../server'; // Import the function to create a game
import '../styles/AddGame.css'; // Create a CSS file for styling

const AddGame = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState('');
  const [genres, setGenres] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleAddGame = async () => {
    if (!title || !description || !cover || !price) {
      setErrorMessage('Title, Description, Cover, and Price must be filled.');
      return;
    }

    const shop = JSON.parse(localStorage.getItem('user')); 

    const newGame = {
      title,
      developer: shop.name, 
      releaseDate: new Date().toLocaleDateString(), 
      description,
      media: [], 
      cover,
      genres: genres.split(',').map(genre => genre.trim()), 
      price: parseFloat(price),
    };

    try {
      const createdGame = await createGame(newGame); 
      const updatedShop = await updateShopGames(shop._id, createdGame._id);

      localStorage.setItem('user', JSON.stringify(updatedShop));
      
      navigate('/shop/collection'); 
    } catch (error) {
      console.error('Error adding game:', error);
      setErrorMessage('Failed to add the game. Please try again.');
    }
  };

  return (
    <div className="add-game-container">
      <h1>Add a New Game</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="form-group">
        <label>Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Cover URL:</label>
        <input 
          type="text" 
          value={cover} 
          onChange={(e) => setCover(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Genres (comma-separated):</label>
        <input 
          type="text" 
          value={genres} 
          onChange={(e) => setGenres(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />
      </div>
      <button 
        className="add-button" 
        onClick={handleAddGame}
      >
        Add Game
      </button>
    </div>
  );
};

export default AddGame;
