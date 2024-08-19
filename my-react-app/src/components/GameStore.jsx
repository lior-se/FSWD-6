import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getLatestGames } from '../server'; 
import { useNavigate } from "react-router-dom"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/GameStore.css'; 

function GameStore() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const latestGames = await getLatestGames();
        setGames(latestGames);
        setFilteredGames(latestGames);
      } catch (error) {
        console.error("Error fetching latest games:", error);
      } finally {
        setLoading(false); // Set loading to false after games are fetched
      }
    };

    fetchGames();
  }, []);

  const filterGames = (genre) => {
    setSelectedGenre(genre);
    if (genre === 'All') {
      setFilteredGames(games);
    } else {
      setFilteredGames(games.filter(game => game.genres.includes(genre)));
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  if (loading) {
    return <div className="game-store"><h2>Loading...</h2></div>; // Render loading state
  }

  const handleGameClick = (gameId) => {
    navigate(`/user/store/${gameId}`); // Navigate to GamePage with gameId
  };


  return (
    <div className="game-store">
      <h2 className="latest-releases">Latest Releases</h2>
      <Slider {...settings} className="game-carousel">
        {games.map((game) => (
          <div 
          key={game._id} 
          className="game-slide"
          onClick={() => handleGameClick(game._id)}
          >
            <div className="game-cover">
              <img src={game.cover} alt={game.title} />
            </div>
            <div className="game-info">
              <h2>{game.title}</h2>
              <p>{game.description}</p>
              <p>Genres: {game.genres.join(", ")}</p>
            </div>
          </div>
        ))}
      </Slider>

      <div className="filter-buttons">
        {['All', 'Adventure', 'Platformer', 'Multiplayer', 'RPG', 'Action'].map((genre) => (
          <button 
            key={genre} 
            className={selectedGenre === genre ? 'active' : ''}
            onClick={() => filterGames(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="game-list">
        {filteredGames.map((game) => (
          <div 
          key={game._id} 
          className="game-list-item"
          onClick={() => handleGameClick(game._id)}
          >
            <div className="game-list-cover">
              <img src={game.cover} alt={game.title} />
            </div>
            <div className="game-list-info">
              <h3>{game.title}</h3>
              <p>Genres: {game.genres.join(", ")}</p>
            </div>
            <div className="game-list-price">
              <p>${game.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameStore;
