import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserProfil from './UserProfil';
import GameStore from './GameStore';
import GameCollection from './GameCollection';
import GamePage from './GamePage'; 
import '../styles/Navbar.css'
const UserApp = () => {
    //const navigate = useNavigate();
    //const [activeSection, setActiveSection] = useState(null);
    
    return (
        <div className="main-app">
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="profil" element={<UserProfil />} />
                    <Route path="store" element={<GameStore />} />
                    <Route path="store/:id" element={<GamePage />} />
                    <Route path="collection" element={<GameCollection />} />
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
            <li className='nav-item' onClick={() => navigate('/user/store')}> Store </li>
            <li className="nav-item" onClick={() => navigate('/user/collection')}>Library</li>
            <li className="nav-item" onClick={() => navigate('/user/profil')}>Profile</li>
        </ul>
        </nav>
    );
}


export default UserApp;
