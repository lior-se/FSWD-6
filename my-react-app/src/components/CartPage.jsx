import React, { useState, useEffect } from 'react';
import { getGameById, updateUserInDatabase } from '../server';

const CartPage = () => {
    const [cartGames, setCartGames] = useState([]);
    const [selectedGames, setSelectedGames] = useState([]);

    useEffect(() => {
        const fetchCartGames = async () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const gamePromises = cart.map(gameId => getGameById(gameId));
            const games = await Promise.all(gamePromises);
            setCartGames(games);
        };

        fetchCartGames();
    }, []);

    const handleSelectGame = (gameId) => {
        setSelectedGames((prevSelected) =>
            prevSelected.includes(gameId)
                ? prevSelected.filter(id => id !== gameId)
                : [...prevSelected, gameId]
        );
    };

    const handlePurchase = async (gamesToPurchase) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const newOwnedGames = gamesToPurchase.filter(gameId => !user.ownedGames.includes(gameId));

            if (newOwnedGames.length > 0) {
                user.ownedGames.push(...newOwnedGames);
                await updateUserInDatabase(user); 
                localStorage.setItem('user', JSON.stringify(user)); 
                alert('Games purchased and added to your library!');

               
                const remainingGames = cartGames.filter(game => !newOwnedGames.includes(game._id));
                localStorage.setItem('cart', JSON.stringify(remainingGames.map(game => game._id)));
                setCartGames(remainingGames);
                setSelectedGames([]);
            } else {
                alert('No new games to purchase.');
            }
        } catch (error) {
            console.error('Error purchasing games:', error);
            alert('Failed to purchase games. Please try again.');
        }
    };

    const handlePurchaseAll = () => {
        const allGameIds = cartGames.map(game => game._id);
        handlePurchase(allGameIds);
    };

    const handlePurchaseSelected = () => {
        handlePurchase(selectedGames);
    };

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {cartGames.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-list">
                        {cartGames.map((game, index) => (
                            <div key={index} className="cart-item">
                                <input
                                    type="checkbox"
                                    checked={selectedGames.includes(game._id)}
                                    onChange={() => handleSelectGame(game._id)}
                                />
                                <img src={game.cover} alt={`${game.title} cover`} className="cart-cover" />
                                <div className="cart-info">
                                    <h2>{game.title}</h2>
                                    <p>{game.developer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-actions">
                        <button onClick={handlePurchaseAll} className="purchase-button">Purchase All</button>
                        <button onClick={handlePurchaseSelected} className="purchase-button">Purchase Selected Items</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
