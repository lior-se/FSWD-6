import React, { useState } from 'react';
import {createShop } from '../server';
import { useNavigate} from 'react-router-dom';
import '../styles/Login.css';

const RegisterShop = () => {
  const [shopname, setShopname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');
  const navigate = useNavigate();

  const handleShopRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const newShop = {
      shopname,
      password,
      name,
      email,
      phone,
      adress,
      Games: []
    };


    try {
      await createShop(newShop);
      localStorage.setItem('shop', JSON.stringify(newShop));
      alert('Registration successful');
      //navigate('/store');
    } catch (error) {
      alert('Error registering user');
      console.error('Error registering user:', error);
    }
  };


  return (
    <div className='login-container'>
    <div className="form">
      <h2 className="h2">Register a Game Shop</h2>
        <form onSubmit={handleShopRegister}>
          <div>
          <label className="label">Shopname:</label>
            <input type="text" className="input" value={shopname} onChange={(e) => setShopname(e.target.value)} required />
          </div>
          <div>
            <label className="label">Password:</label>
            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div>
            <label className="label">Confirm Password:</label>
            <input type="password" className="input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div>
            <label className="label">Name:</label>
            <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="label">Email:</label>
            <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="label">Phone:</label>
            <input type="text" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div>
            <label className="label">Adress:</label>
            <input type="text" className="input" value={adress} onChange={(e) => setAdress(e.target.value)} required />
          </div>
          <button type="submit" className="button">Complete Registration</button>
        </form>
    </div>
    </div>
  );
};

export default RegisterShop;
