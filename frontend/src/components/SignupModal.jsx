import React, { useState } from 'react';
import './LoginModal.css';
import loginImg from '../assets/png.png';

const SignupModal = ({ open, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: ''
  });
  const [error, setError] = useState('');
  if (!open) return null;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || 'Registration failed');
      else onClose();
    } catch {
      setError('Server error');
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal login-modal-flex">
        <div className="login-modal-img">
          <img src={loginImg} alt="Signup visual" />
        </div>
        <div className="login-modal-form">
          <button className="login-close" onClick={onClose}>&times;</button>
         
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-input-group">
              <input name="name" type="text" placeholder="Enter name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="login-input-group">
              <input name="mobile" type="tel" placeholder="Enter mobile" value={form.mobile} onChange={handleChange} required />
            </div>
            <div className="login-input-group">
              <input name="email" type="email" placeholder="Enter email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="login-input-group">
              <input name="password" type="password" placeholder="Enter password" value={form.password} onChange={handleChange} required />
            </div>
            <div className="login-input-group">
              <input name="confirmPassword" type="password" placeholder="Confirm password" value={form.confirmPassword} onChange={handleChange} required />
            </div>
            <div className="login-input-group">
              <input name="address" type="text" placeholder="Enter address" value={form.address} onChange={handleChange} required />
            </div>
            {error && <div style={{color: 'red', textAlign: 'center'}}>{error}</div>}
            <button type="submit" className="login-submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
