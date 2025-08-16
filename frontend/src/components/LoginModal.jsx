import React from 'react';
import './LoginModal.css';
import loginImg from '../assets/png.png'; // Add your image to assets folder

const LoginModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="login-modal-overlay">
      <div className="login-modal login-modal-flex">
        <div className="login-modal-img">
          <img src={loginImg} alt="Login visual" />
        </div>

        <div className="login-modal-form">
          <button className="login-close" onClick={onClose}>&times;</button>
          <h3 className="login-quote">Wear Your Confidence&#9786;</h3>
          <form className="login-form">
            <div className="login-input-group">
              <span className="login-country"></span>
              <input type="email" placeholder="Enter email" maxLength={50} required />
            </div>
            <div className="login-input-group">
              <span className="login-country"></span>
              <input type="password" placeholder="Enter password" maxLength={20} required />
            </div>
            
            <button type="submit" className="login-submit">Submit</button>
          </form>

          {/* Signup Link */}
          <div className="login-links">
            <span>Don’t have an account? </span>
            <a href="/signup" className="signup-link">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;