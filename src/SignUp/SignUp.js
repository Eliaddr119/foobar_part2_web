import React, { useEffect, useState } from 'react';
import userIcon from '../Assets/person.png';
import passwordIcon from '../Assets/password.png';
import imgIcon from '../Assets/image.svg';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const nevigate = useNavigate();
  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 4_000);
    }
  }, [error]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setImage(null)
      return;
    }
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      // Clear the error message after 3 seconds
      setTimeout(() => setError(''), 3_000);
      // Clear the file input
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const isPasswordIsStrong = passwordStrength(password);
    const isPasswordMatch = passwordMatch(password, confirmPassword);

    if (!isPasswordIsStrong) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and 8 characters.');
      return;
    }

    if (!isPasswordMatch) {
      setError('Password does not match.');
      return;
    }

    const user = { username, password, displayName, image };

    try {
      // Retrieve the users array from session storage
      const storedUsers = JSON.parse(sessionStorage.getItem('users')) || [];

      // Check if the username already exists
      const existingUser = storedUsers.find(user => user.username === username);
      if (existingUser) {
        setError('Username already exists.');
        return;
      }
      // Add the new user to the array
      storedUsers.push(user);

      // Save the updated users array to local storage
      sessionStorage.setItem('users', JSON.stringify(storedUsers));

      setIsSuccess(true);
      // Handle successful signup
      console.log('Signup successful!');

      // Clear the success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 4_000);

      // Clear the form fields and the state variables
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setDisplayName('');
      setImage(null);
      nevigate('/SignIn');

      // ... (e.g., redirect to a different page or display a success message)

    } catch (error) {
      // Handle any errors during storage
      setError('Signup error: ' + error.message);
    }

  };

  const passwordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  }

  const passwordStrength = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 8;

    return hasUppercase && hasLowercase && hasNumber && hasMinLength;
  };

  return ( 
    <div id='signUpBody'>
    <div id="signUpContainer" className='container'>
      
      <div className='registration-card-container'>
      <h1  id="pageHead">FOOBAR</h1>
        <div className='registration-card'>
          <div className='card-header'>Create a new account</div>
          {isSuccess && <div className="success-message">Signup successful!</div>}
          <div className='card-body'>
            <form onSubmit={onSubmit}>
              {error && <div className="error-message">{error}</div>}
              <div className="input-wrapper">
                <input type='text' placeholder='Username' className='input-field' required value={username} onChange={(e) => setUsername(e.target.value)} />
                <img src={userIcon} alt="User Icon" className="input-icon" />
              </div>
              <br />
              <div className="input-wrapper">
                <input type='password' placeholder='Password' className='input-field' required value={password} onChange={(e) => setPassword(e.target.value)} />
                <img src={passwordIcon} alt="Password Icon" className="input-icon" />
              </div>
              <br />
              <div className="input-wrapper">
                <input type='password' placeholder='Confirm Password' className='input-field' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <img src={passwordIcon} alt="Password Icon" className="input-icon" />
              </div>
              <br />
              <div className="input-wrapper">
                <input type='text' placeholder='Display Name' className='input-field' required value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                <img src={userIcon} alt="User Icon" className="input-icon" />
              </div>
              <br />
              <div className="input-wrapper" >
                <img src={imgIcon} alt="img Icon" className="input-icon" id="imag-icon" />
              </div>
              <div className="profile-w">
                <label htmlFor='image' id="profile" className='input-label'>Profile Image</label>
                <input type='file' id='image' name='image' className='input-field' required onChange={handleImageUpload} />
              </div>
              <br />
              {image && <img src={image} alt='' className='uploaded-image' />}
              <button id="signUpButton" type='submit'>Sign Up</button>
              <div className='text-center'>
              <text>Back to Sign In </text>
              <Link to="/SignIn">
                <span className="click-here">click here</span>
              </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default SignUp;