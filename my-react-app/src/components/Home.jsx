import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to GameStore</h1>
      <div className="button-group">
        <button className="home-button" onClick={() => navigate('/login')}>Login</button>
        <button className="home-button" onClick={() => navigate('/register-shop')}>Register as a Shop</button>
        <button className="home-button" onClick={() => navigate('/register-user')}>Register as a User</button>
      </div>
    </div>
  );
};

export default Home;
