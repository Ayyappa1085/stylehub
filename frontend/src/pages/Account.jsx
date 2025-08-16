import { useState } from 'react';
import LoginModal from '../components/LoginModal';

const Account = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh'}}>
      <h2>Account</h2>
      <button
        style={{
          background: '#d3a892',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '12px 32px',
          fontSize: '1.1em',
          cursor: 'pointer',
          marginTop: '32px',
        }}
        onClick={() => setShowLogin(true)}
      >
        Login
      </button>
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
};

export default Account;
