import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getLatestGames, getAllGames } from '../server'; 
import { useNavigate } from "react-router-dom"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/GameStore.css'; 

function GameStore() {
  const [latestGames, setLatestGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const latestGamesResponse = await getLatestGames();
        const allGamesResponse = await getAllGames();
        setLatestGames(latestGamesResponse);
        setAllGames(allGamesResponse);
        setFilteredGames(allGamesResponse);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const filterGames = (genre) => {
    setSelectedGenre(genre);
    filterBySearchTermAndGenre(searchTerm, genre);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterBySearchTermAndGenre(term, selectedGenre);
  };

  const filterBySearchTermAndGenre = (term, genre) => {
    let filtered = allGames;

    if (genre !== 'All') {
      filtered = filtered.filter(game => game.genres.includes(genre));
    }

    if (term) {
      filtered = filtered.filter(game => game.title.toLowerCase().includes(term.toLowerCase()));
    }

    setFilteredGames(filtered);
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
    return <div className="game-store"><h2>Loading...</h2></div>;
  }

  const handleGameClick = (gameId) => {
    navigate(`/user/store/${gameId}`);
  };

  return (
    <div className="game-store">
      <h2 className="latest-releases">Latest Releases</h2>
      <Slider {...settings} className="game-carousel">
        {latestGames.map((game) => (
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

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search by game name..." 
          value={searchTerm}
          onChange={handleSearch}
        />
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
