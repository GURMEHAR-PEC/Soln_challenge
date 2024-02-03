// SignInSignUp.js

import React, { useState, useEffect } from 'react';
import './SignInSignUp.css';
import imgnail from '../components/images/altbg.jpeg';

const SignInSignUp = () => {
  const [isSignUpMode, setSignUpMode] = useState(false);

  const toggleMode = () => {
    setSignUpMode(!isSignUpMode);
  };

  useEffect(() => {
    const container = document.querySelector('.container');

    if (container) {
      const sign_up_btn = document.querySelector('#sign-up-btn');
      const sign_in_btn = document.querySelector('#sign-in-btn');
      const sign_up_btn2 = document.querySelector('#sign-up-btn2');
      const sign_in_btn2 = document.querySelector('#sign-in-btn2');

      if (sign_up_btn && sign_in_btn && sign_up_btn2 && sign_in_btn2) {
        sign_up_btn.addEventListener('click', () => {
          container.classList.add('sign-up-mode');
        });

        sign_in_btn.addEventListener('click', () => {
          container.classList.remove('sign-up-mode');
        });

        sign_up_btn2.addEventListener('click', () => {
          container.classList.add('sign-up-mode2');
        });

        sign_in_btn2.addEventListener('click', () => {
          container.classList.remove('sign-up-mode2');
        });
      }
    }
  }, [isSignUpMode]);

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="signin-signup">
        {/* Sign-in form */}
        <div className={`card-form ${isSignUpMode ? '' : 'visible'}`}>
          <form action="" className={`sign-in-form ${isSignUpMode ? '' : 'visible'}`}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn" />
            <p className="account-text">
              Don't have an account? <button type="button" id="sign-up-btn2" onClick={toggleMode}>Sign up</button>
            </p>
          </form>
        </div>

        {/* Sign-up form */}
        <div className={`card-form ${isSignUpMode ? 'visible' : ''}`}>
          <form action="" className={`sign-up-form ${isSignUpMode ? 'visible' : ''}`}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="text" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Sign up" className="btn" />
            <p className="account-text">
              Already have an account? <button type="button" id="sign-in-btn2" onClick={toggleMode}>Sign in</button>
            </p>
          </form>
        </div>
      </div>

      {/* Panels container */}
      <div className="panels-container">
        {/* Left panel */}
        <div className={`panel left-panel ${isSignUpMode ? 'visible' : ''}`}>
          <div className="content">
          <div className="background-image">
              <img src={imgnail} alt="signup" className="image" />
            </div>
            <button type="button" className="btn" onClick={toggleMode}>Sign in</button>
          </div>
        </div>

        {/* Right panel */}
        <div className={`panel right-panel ${isSignUpMode ? '' : 'visible'}`}>
          <div className="content">
            <div className="background-image">
              <img src={imgnail} alt="signup" className="image" />
            </div>
            <button type="button" className="btn" onClick={toggleMode}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
