// src/components/SignIn.js
import React, { useState } from 'react';
import { isUserRegistered } from '../userService';
import './SignIn.css';
import fooBarIcon from './fooBarIcon.jpg'; // Adjust the path accordingly


const SignIn = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = () => {
    // Check if the user is registered
    const userExists = isUserRegistered(userName, password);

    if (userExists) {
      // Add authentication logic here
      console.log('Sign in successful!');
    } else {
      console.log('Invalid email or password. Please try again.');
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    // Check if the pressed key is "Enter"
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };
  return (
    <div className='sign-in-container'>
      <img src={fooBarIcon} alt="FooBar Icon" className="icon-img" />
      <h2>Sign In</h2>
      <form>
        <label>User Name:</label>
        <input
          type="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress} // enter key trigger password check
          />
        </div>
        <button type="button" class="btn btn-primary btn-sm" onClick={handleSignIn}>
          Sign In
        </button>
        {errorMessage && <div class="alert alert-warning" role="alert">
          {errorMessage}</div>}
      </form>
    </div>
  );
};

export default SignIn;



