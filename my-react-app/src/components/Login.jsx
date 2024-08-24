import React, { useState } from 'react';
import { loginUser } from '../server';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(username, password);
  
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        alert('Login successful');
        
        // Navigate based on the type of user
        if (user.address) {
          navigate('/shop/collection');
        } else {
          navigate('/user/store');
        }
      }
    } catch (error) {
      alert('Invalid username or password');
      console.error('Error logging in:', error);
    }
  };
  return (
    <div className="login-container">
      <div className="form">
        <h2 className="h2">Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label className="label">Username:</label>
            <input type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="label">Password:</label>
            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button id='loginbuttonconfirm' type="submit" className="button">Login</button>
        </form>
      </div>
      </div>
  );
};

export default Login;
