import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import GameStore from './GameStore';
import GameCollection from './GameCollection';
import GamePage from './GamePage'; 
import CartPage from './CartPage';
import '../styles/Navbar.css'
const UserApp = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.username) {
            navigate('/'); 
        }
    }, [navigate]);

    return (
        <div className="main-app">
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="profil" element={<UserProfile />} />
                    <Route path="store" element={<GameStore />} />
                    <Route path="store/:id" element={<GamePage />} />
                    <Route path="collection" element={<GameCollection />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="*" element={<h1>404 - Not Found</h1>} />
                </Routes>
            </div>
        </div>
    );
}

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className='nav-item' onClick={() => navigate('/user/store')}>Store</li>
                <li className="nav-item" onClick={() => navigate('/user/collection')}>Library</li>
                <li className="nav-item" onClick={() => navigate('/user/profil')}>Profile</li>
                <div className="nav-right">
                    <li className="nav-item" onClick={() => navigate('/user/cart')}>Cart</li>
                    <li className="nav-item" onClick={() => {
                        localStorage.removeItem('user'); 
                        navigate('/');
                    }}>Logout</li>
                </div>
            </ul>
        </nav>
    );
}


export default UserApp;
