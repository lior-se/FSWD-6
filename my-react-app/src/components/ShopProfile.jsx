import React, { useState, useEffect } from 'react';
import { updateShopInDatabase } from '../server';
import '../styles/ShopProfile.css';

const ShopProfile = () => {
  const [shop, setShop] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const [streetNumber, setStreetNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    const storedShop = JSON.parse(localStorage.getItem('user'));
    if (storedShop) {
      setShop(storedShop);
      // Divide the address into its parts
      const addressParts = storedShop.address.split(', ');
      setStreetNumber(addressParts[0] || '');
      setStreet(addressParts[1] || '');
      setCity(addressParts[2] || '');
      setCountry(addressParts[3] || '');
    }
  }, []);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const updatedShop = {
        ...shop,
        address: `${streetNumber}, ${street}, ${city}, ${country}`
      };
      await updateShopInDatabase(updatedShop);
      localStorage.setItem('user', JSON.stringify(updatedShop));
      setShop(updatedShop);
      setEditing(false);
    } catch (error) {
      console.error('Error updating shop:', error);
      alert('Failed to update shop profile. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShop((prevShop) => ({
      ...prevShop,
      [name]: value,
    }));
  };

  const handlePasswordVisibility = () => {
    const storedShop = JSON.parse(localStorage.getItem('user'));
    if (passwordInput === storedShop.password) {
      setShowPassword(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!shop) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shop-profile-page">
      <h1>Shop Profile</h1>
      <div className="shop-profile">
        <div className="shop-profile-field">
          <label>Shopname:</label>
          <input
            type="text"
            name="shopname"
            value={shop.shopname}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="shop-profile-field">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={shop.name}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="shop-profile-field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={shop.email}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="shop-profile-field">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={shop.phone}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        <div className="shop-profile-field">
          <label>Password:</label>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              value={showPassword ? shop.password : '********'}
              readOnly
            />
            {!showPassword && (
              <>
                <input
                  id='ShowPasswordInput'
                  type="password"
                  placeholder="Enter your password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <button className='shop-profile-button'
                 onClick={handlePasswordVisibility}>Show Password</button>
              </>
            )}
          </div>
        </div>

        <div className="shop-profile-field">
          <label>Street Number:</label>
          <input
            type="text"
            name="streetNumber"
            value={streetNumber}
            onChange={(e) => setStreetNumber(e.target.value)}
            disabled={!editing}
          />
        </div>

        <div className="shop-profile-field">
          <label>Street:</label>
          <input
            type="text"
            name="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            disabled={!editing}
          />
        </div>

        <div className="shop-profile-field">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!editing}
          />
        </div>

        <div className="shop-profile-field">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={!editing}
          />
        </div>

        {editing ? (
          <button className='shop-profile-button'
          onClick={handleSaveClick}>
            Save</button>
        ) : (
          <button className='shop-profile-button'
          onClick={handleEditClick}>
            Edit Profile</button>
        )}
      </div>
    </div>
  );
};


export default ShopProfile;
