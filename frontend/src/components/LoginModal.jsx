import React, { useState } from 'react';
import './LoginModal.css';
import loginImg from '../assets/png.png';

const LoginModal = ({ open, onClose, onSignup, onLoginSuccess }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
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
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || 'Login failed');
      else {
        setError('');
        onLoginSuccess(data.user);
      }
    } catch (err) {
      setError('Unable to connect to server.');
    }
  };

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
              <input name="email" type="email" placeholder="Enter email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="login-input-group">
              <input name="password" type="password" placeholder="Enter password" value={form.password} onChange={handleChange} required />
            </div>
            {error && <div style={{color: 'red', textAlign: 'center'}}>{error}</div>}
            <button type="submit" className="login-submit">Submit</button>
          </form>

          {/* Signup Link */}
          <div className="login-links">
            <span>Don’t have an account? </span>
            <button className="signup-link" onClick={onSignup} style={{background: 'none', border: 'none', color: '#d3a892', cursor: 'pointer'}}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;