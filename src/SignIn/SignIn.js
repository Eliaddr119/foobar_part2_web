// src/components/SignIn.js
import React, { useState } from 'react';
import { isUserRegistered } from '../userService';
import './SignIn.css';

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
      // todo -  navigate to post page
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
      <h1 className='header'>FOOBAR</h1>
      <div className='registration-card-container'>
        <div className='registration-card'>
          <div className='card-header'>Sign In</div>
          <form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="input-wrapper">
              <input
                type='text'
                placeholder='User Name'
                className='input-field'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <br />
            <div className="input-wrapper">
              <input
                type='password'
                placeholder='Password'
                className='input-field'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
            <br />
            <button type="button" className="btn btn-primary btn-sm" onClick={handleSignIn}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
