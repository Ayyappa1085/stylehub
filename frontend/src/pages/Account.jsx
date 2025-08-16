import { useState } from 'react';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

const Account = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh'}}>
      <h2>Account</h2>
      <div style={{display: 'flex', gap: '24px', margin: '32px 0'}}>
        <button
          style={{background: '#d3a892', color: '#fff', border: 'none', borderRadius: '6px', padding: '12px 32px', fontSize: '1.1em', cursor: 'pointer'}}
          onClick={() => setShowLogin(true)}
        >Login</button>
        <button
          style={{background: '#222', color: '#fff', border: 'none', borderRadius: '6px', padding: '12px 32px', fontSize: '1.1em', cursor: 'pointer'}}
          onClick={() => setShowSignup(true)}
        >Sign Up</button>
      </div>
      {message && <div style={{color: 'green', fontWeight: 'bold', marginBottom: '24px'}}>{message}</div>}
      {user && (
        <div style={{background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '32px', minWidth: '320px'}}>
          <h3>User Details</h3>
          <div><strong>Name:</strong> {user.name}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>Mobile:</strong> {user.mobile}</div>
          <div><strong>Address:</strong> {user.address}</div>
        </div>
      )}
      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
        onLoginSuccess={(userData) => {
          setShowLogin(false);
          setUser(userData);
          setMessage('Login successful!');
        }}
      />
      <SignupModal
        open={showSignup}
        onClose={() => setShowSignup(false)}
      />
    </div>
  );
};

export default Account;
