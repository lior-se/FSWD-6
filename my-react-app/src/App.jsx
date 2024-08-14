import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Login from './components/Login';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />

      </Routes>
    </Router>
  );
};

export default App;

/*
<Route path="/login" element={<Login />} />
<Route path="/register-shop" element={<RegisterShop />} />
<Route path="/register-user" element={<RegisterUser />} />
        
*/