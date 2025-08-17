import './Header.css';
import logo from '../assets/logo.png';
import { FaHome, FaUser, FaSearch, FaHeart, FaCartPlus } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../App';
import LoginModal from './LoginModal';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { user, setUser } = useContext(UserContext);

  const [showLogin, setShowLogin] = useState(false);

  const handleAccountClick = () => {
    if (user) {
      navigate('/account');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <>
      <header className="header">
        <nav className="nav-left">
          <ul>
            <li className={path === '/men' ? 'active-nav' : ''} onClick={() => navigate('/men')}>Men</li>
            <li className={path === '/women' ? 'active-nav' : ''} onClick={() => navigate('/women')}>Women</li>
            <li className={path === '/kids' ? 'active-nav' : ''} onClick={() => navigate('/kids')}>Kids</li>
            <li className={path === '/watches' ? 'active-nav' : ''} onClick={() => navigate('/watches')}>Watches</li>
          </ul>
        </nav>

        <div className="logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <nav className="nav-right">
          <ul>
            <li title="search"><FaSearch /></li>
            <li title="Home" onClick={() => navigate('/')} className={path === '/' ? 'active-home' : ''}>
              <FaHome />
            </li>
            <li title="Wishlist" onClick={() => navigate('/likes')} className={path === '/likes' ? 'active-likes' : ''}><FaHeart /></li>
            <li title="Cart" onClick={() => navigate('/cart')} className={path === '/cart' ? 'active-cart' : ''}><FaCartPlus /></li>
            <li title="Account" onClick={handleAccountClick}><FaUser /></li>
          </ul>
        </nav>
      </header>

      {/* Login modal if not logged in */}
      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSignup={() => {}}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);      // save in context
          setShowLogin(false);
          navigate('/account');       // go to account page
        }}
      />
    </>
  );
};

export default Header;
