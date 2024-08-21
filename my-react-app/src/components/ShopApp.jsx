import { BrowserRouter as Router, Routes, Route,useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import ShopProfile from './ShopProfile';
import ShopGamePage from './ShopGamePage';
import '../styles/Navbar.css'
import ShopCollection from './ShopCollection';
const ShopApp = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.shopname) {
            navigate('/'); // Redirect to home if no shopname is found
        }
    }, [navigate]);
    
    return (
        <div className="main-app">
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="profile" element={<ShopProfile />} />
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


export default ShopApp;
