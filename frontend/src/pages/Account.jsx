import { useState } from 'react';
import LoginModal from '../components/LoginModal';

const Account = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <h2>Account</h2>
      <button
        style={{
          background: hover ? '#d3a892' : '#000000', // black default, beige on hover
          color: hover ? '#000000' : '#ffffff',      // white default, black on hover
          border: 'none',
          borderRadius: '6px',
          padding: '12px 32px',
          fontSize: '1.1em',
          cursor: 'pointer',
          marginTop: '32px',
          transition: 'all 0.3s', // smooth transition
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setShowLogin(true)}
      >
        Login
      </button>
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
};

export default Account;
