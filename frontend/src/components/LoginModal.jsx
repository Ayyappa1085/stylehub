import React, { useState } from 'react';
import './LoginModal.css';
import loginImg from '../assets/png.png';
import SignupModal from './SignupModal';

const LoginModal = ({ open, onClose, onLoginSuccess }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showSignup, setShowSignup] = useState(false); // toggle signup modal

  if (!open) return null;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please enter both email and password.');
      return;
    }
    try {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include', // keep cookies
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || 'Login failed');
      else {
        onLoginSuccess(data.user); // server returns { user }
      }
    } catch (err) {
      setError('Unable to connect to server.');
    }
  };

  // If signup is toggled, show SignupModal instead of LoginModal
  if (showSignup) {
    return (
      <SignupModal
        open={showSignup}
        onClose={() => {
          setShowSignup(false);
          onClose(); // close completely if user cancels
        }}
        onSignupSuccess={(newUser) => {
          onLoginSuccess(newUser); // log them in immediately after signup
          setShowSignup(false);
        }}
      />
    );
  }

  return (
    <div className="login-modal-overlay">
      <div className="login-modal login-modal-flex">
        <div className="login-modal-img">
          <img src={loginImg} alt="Login visual" />
        </div>

        <div className="login-modal-form">
          <button className="login-close" onClick={onClose}>&times;</button>
          <h3 className="login-quote">Wear Your Confidence</h3>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-input-group">
              <input
                name="email"
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-input-group">
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
            <button type="submit" className="login-submit">Submit</button>
          </form>

          <div className="login-links">
            <span>Don’t have an account? </span>
            <button
              className="signup-link"
              onClick={() => setShowSignup(true)}
              style={{ background: 'none', border: 'none', color: '#d3a892', cursor: 'pointer' }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
