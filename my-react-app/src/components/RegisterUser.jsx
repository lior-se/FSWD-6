import React, { useState } from 'react';
import {createUser } from '../server';
import { useNavigate} from 'react-router-dom';
import '../styles/Login.css';

const RegisterUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleUserRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const newUser = {
      username,
      password,
      name,
      email,
      phone,
      ownedGames: []
    };


    try {
      await createUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      alert('Registration successful');
      navigate('/store');
    } catch (error) {
      alert('Error registering user');
      console.error('Error registering user:', error);
    }
  };


  return (
    <div className='login-container'>
    <div className="form">
      <h2 className="h2">Register a New User</h2>
        <form onSubmit={handleUserRegister}>
          <div>
          <label className="label">Username:</label>
            <input type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} required />
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
          <button type="submit" className="button">Complete Registration</button>
        </form>
    </div>
    </div>
  );
};

export default RegisterUser;
