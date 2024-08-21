import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserProfil from './UserProfile';
import ShopGamePage from './ShopGamePage';
import '../styles/Navbar.css'
import ShopCollection from './ShopCollection';
const UserApp = () => {
    //const navigate = useNavigate();
    //const [activeSection, setActiveSection] = useState(null);
    
    return (
        <div className="main-app">
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="profile" element={<UserProfil />} />
                    <Route path="collection" element={<ShopCollection />} />
                    <Route path="collection/:id" element={<ShopGamePage />} />
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
            <li className='nav-item' onClick={() => navigate('/shop/collection')}> Collection </li>
            <li className="nav-item" onClick={() => navigate('/shop/profile')}>Profile</li>
        </ul>
        </nav>
    );
}


export default UserApp;
