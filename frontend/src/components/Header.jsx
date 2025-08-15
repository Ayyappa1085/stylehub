import './Header.css';
import logo from '../assets/logo.png';
import { FaHome, FaUser, FaSearch } from 'react-icons/fa';

const Header = ({ onCategorySelect }) => (
  <header className="header">
    <nav className="nav-left">
      <ul>
        <li onClick={() => onCategorySelect('Men')}>Men</li>
        <li onClick={() => onCategorySelect('Women')}>Women</li>
        <li onClick={() => onCategorySelect('Kids')}>Kids</li>
      </ul>
    </nav>

    <div className="logo-container">
      <img src={logo} alt="Logo" className="logo" />
    </div>

    <nav className="nav-right">
      <ul>
        <li title="search"><FaSearch /></li>
        <li title="Home"><FaHome /></li>
        <li title="Account"><FaUser /></li>
      </ul>
    </nav>
  </header>
);

export default Header;
