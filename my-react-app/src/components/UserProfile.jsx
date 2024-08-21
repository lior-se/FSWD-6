import React, { useState, useEffect } from 'react';
import '../styles/UserProfile.css';
import { updateUserInDatabase } from '../server';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
  
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
      }
    }, []);
  
    const handleEditClick = () => {
      setEditing(true);
    };
  
    const handleSaveClick = async () => {
      try {
        await updateUserInDatabase(user);
        localStorage.setItem('user', JSON.stringify(user));
        setEditing(false);
      } catch (error) {
        console.error('Error updating user:', error);
        alert('Failed to update profile. Please try again.');
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    };
  
    const handlePasswordVisibility = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (passwordInput === storedUser.password) {
        setShowPassword(true);
      } else {
        alert('Incorrect password');
      }
    };
  
    if (!user) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="user-profile-page">
        <h1 id="UserProf">User Profile</h1>
        <div className="user-profile">
          <div className="user-profile-field">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
  
          <div className="user-profile-field">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
  
          <div className="user-profile-field">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
  
          <div className="user-profile-field">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
  
          <div className="user-profile-field">
            <label>Password:</label>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={showPassword ? user.password : '********'}
                onChange={handleChange}
                readOnly={!showPassword}
              />
              {!showPassword && (
                <>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    id='passwordcheck'
                  />
                  <button onClick={handlePasswordVisibility} className='ProfBut'>Show Password</button>
                </>
              )}
            </div>
          </div>
  
          {editing ? (
            <button onClick={handleSaveClick} className='ProfBut'>Save</button>
          ) : (
            <button onClick={handleEditClick} className='ProfBut'>Edit Profile</button>
          )}
        </div>
      </div>
    );
  };

export default UserProfile;
