import './Header.css';
import logo from '../assets/logo.png';
import { FaHome, FaUser, FaSearch, FaHeart, FaCartPlus } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  return (
    <header className="header">
      <nav className="nav-left">
        <ul>
          <li
            className={path === '/men' ? 'active-nav' : ''}
            onClick={() => navigate('/men')}
          >Men</li>
          <li
            className={path === '/women' ? 'active-nav' : ''}
            onClick={() => navigate('/women')}
          >Women</li>
          <li
            className={path === '/kids' ? 'active-nav' : ''}
            onClick={() => navigate('/kids')}
          >Kids</li>
          <li
            className={path === '/Watches' ? 'active-nav' : ''}
            onClick={() => navigate('/Watches')}
          >Watches</li>
        </ul>
      </nav>

      <div
        className="logo-container"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      >
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <nav className="nav-right">
        <ul>
          <li title="search"><FaSearch /></li>
          <li
            title="Home"
            onClick={() => navigate('/')}
            className={path === '/' ? 'active-home' : ''}
          >
            <FaHome />
          </li>
          <li title="Wishlist"><FaHeart /></li>
          <li title="Cart"><FaCartPlus /></li>
          <li title="Account"><FaUser /></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
