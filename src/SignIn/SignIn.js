// src/components/SignIn.js
import React, { useState } from 'react';
import { isUserRegistered } from '../userService';


const SignIn = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Check if the user is registered
    const userExists = isUserRegistered(userName, password);

    if (userExists) {
      // Add authentication logic here
      console.log('Sign in successful!');
    } else {
      console.log('Invalid email or password. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    // Check if the pressed key is "Enter"
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };
  return (
    <div>
      <h2>Sign In</h2>
      <form>
        <label>User Name:</label>
        <input
          type="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
