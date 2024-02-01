import React, { useState } from 'react';
import './SignUp.css';

function SignUp() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="SignUp">
      <header className="SignUp-header">
        <h2>Sign Up</h2>
      </header>
      <body>
        <h5>let's get started</h5>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password:
          <input type="Password" name="password" />
        </label>
        <br />
        <label>
          password verification:
          <input type="Password" name="password" />
        </label>
        <br />
        <label>
          Name displayed:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          picture:
          <input type="file" name="picture" onChange={handleImageChange} />
        </label>
        <br />
        {image && (
          <img src={image} alt="User chosen" style={{ height: '100px', width: '100px' }} />
        )}
        <br />
        <button type="button" className="btn btn-success">Sign Up</button>
      </body>
    </div>
  );
}

export default SignUp;
