import { BrowserRouter as Router, Routes, Route,useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import ShopProfile from './ShopProfile';
import ShopGamePage from './ShopGamePage';
import ShopCollection from './ShopCollection';
import AddGame from './AddGame';
import '../styles/Navbar.css'

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
                    <Route path="add-game" element={<AddGame />} />
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
            <div className="nav-right">
                    <li className="nav-item" onClick={() => {
                        localStorage.removeItem('user');
                        navigate('/');
                    }}>Logout</li>
                </div>
        </ul>
        </nav>
    );
}


export default ShopApp;
