import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserProfil from './UserProfil';
import ShopHome from './ShopHome';
import GameCollection from './GameCollection';
import '../styles/Navbar.css'
const ShopApp = () => {
    //const navigate = useNavigate();
    //const [activeSection, setActiveSection] = useState(null);
    
    return (
        <div className="main-app">
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="Profil" element={<UserProfil />} />
                    <Route path="ShopHome" element={<ShopHome />} />
                    <Route path="Collection" element={<GameCollection />} />
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
            <li className="nav-item" onClick={() => navigate('/store/Collection')}>Library</li>
            <li className="nav-item" onClick={() => navigate('/store/Profil')}>Profile</li>
            <li className='nav-item' onClick={() => navigate('/store/ShopHome')}> Store </li>
        </ul>
        </nav>
    );
}


export default ShopApp;
