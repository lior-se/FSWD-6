import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to MEATS GameStore</h1>
      <img 
        src="https://i.postimg.cc/QMN00MTF/meats.png" 
        alt="GameStore Logo" 
        className="home-image"
      />
      <div className="button-group">
        <button className="home-button" onClick={() => navigate('/login')}>Login</button>
        <button className="home-button" onClick={() => navigate('/register-shop')}>Register as a Shop</button>
        <button className="home-button" onClick={() => navigate('/register-user')}>Register as a User</button>
      </div>
    </div>
  );
};

export default Home;
