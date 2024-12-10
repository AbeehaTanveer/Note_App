import React from 'react';

const Swap = ({ handleSignInClick, handleSignUpClick }) => {
  return (
    <div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back, Reader!</h1>
            <p>Log in to access your saved notes and ideas about your favorite books.</p>
            <button className="ghost" id="signIn" onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Ready to Start Writing?</h1>
            <p>Create an account to keep track of your thoughts, goals, and book notes.</p>
            <button className="ghost" id="signUp" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
