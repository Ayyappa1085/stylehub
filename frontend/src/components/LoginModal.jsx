import React from 'react';
import './LoginModal.css';
import loginImg from '../assets/logo2.png'; // Add your image to assets folder

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
          <h2>LET'S GET RARE !</h2>
          <form className="login-form">
            <div className="login-input-group">
              <span className="login-country">🇮🇳 +91</span>
              <input type="tel" placeholder="Enter Mobile Number" maxLength={10} required />
            </div>
            <label className="login-checkbox">
              <input type="checkbox" /> Notify me for Updates and Offers
            </label>
            <button type="submit" className="login-submit">Submit</button>
          </form>
          <div className="login-links">
            <a href="#">Privacy Policy and T&amp;Cs</a> | <a href="#">Help Center</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
