// src/components/SignIn.js
import React, { useState } from 'react';
import { findUser, isUserRegistered } from '../userService';
import { useNavigate,Link} from 'react-router-dom';
import userIcon from '../Assets/person.png';
import passwordIcon from '../Assets/password.png';
import './SignIn.css';

const SignIn = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const Navigate = useNavigate();
  const handleSignIn = () => {
    // Check if the user is registered
    const userExists = isUserRegistered(userName, password);

    if (userExists) {
      // Add authentication logic here
      console.log('Sign in successful!');
      sessionStorage.setItem('current_usr',JSON.stringify(findUser(userName)));
      Navigate('/FeedPage');
    } else {
      console.log('Invalid UserName or Password. Please try again.');
      setErrorMessage('Invalid UserName or Password. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    // Check if the pressed key is "Enter"
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  return (
    <div id="signInBody">
    <div className='sign-in-container'>
      <h1 className='header'>FOOBAR</h1>
      <div className='registration-card-container'>
        <div className='registration-card' id='r-c'>
          <div className='card-header'>Sign In</div>
          <form id="signInForm">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="input-wrapper">
              <input  type='text' placeholder='User Name' className='input-field' value={userName} onChange={(e) => setUserName(e.target.value)}/>
              <img src={userIcon} alt="User Icon" className="input-icon" />
            </div>
            <br />
            <div className="input-wrapper">
              <input  type='password' placeholder='Password' className='input-field' value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyPress}/>
              <img src={passwordIcon} alt="password Icon" className="input-icon" />
            </div>
            <br />
            <div className='sign-up-sign-in'>
            <button type="button" id="btt-st" className="btn btn-primary btn-sm" onClick={handleSignIn}>
              Sign In
            </button>
            <text>Don't have an account yet? </text>
              <Link to="/SignUp">
                <span className="click-here">click here</span>
              </Link>
                <text> to create one</text>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignIn;
