import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import RegisterUser from './components/RegisterUser';
import RegisterShop from './components/RegisterShop';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register-user" element={<RegisterUser />} />
      <Route path="/register-shop" element={<RegisterShop />} />
      </Routes>
    </Router>
  );
};

export default App;

/*

<Route path="/register-shop" element={<RegisterShop />} />

        
*/