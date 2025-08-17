import './Card.css';
import { FaHeart } from 'react-icons/fa';
import { BsBag } from 'react-icons/bs';
import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../App';
import LoginModal from './LoginModal';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

const Card = ({ id, image, title, subtitle, price, oldPrice, discount }) => {
  const { user, setUser } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);

  const product = { id, image, title, subtitle, price, oldPrice, discount };

  const handleLike = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    try {
      await axios.post('/users/like', { product });
      const me = await axios.get('/users/me');
      setUser(me.data.user);
    } catch (err) {
      alert(err.response?.data?.error || 'Error adding to likes');
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    try {
      await axios.post('/users/cart', { product });
      const me = await axios.get('/users/me');
      setUser(me.data.user);
    } catch (err) {
      alert(err.response?.data?.error || 'Error adding to cart');
    }
  };

  return (
    <>
      <div className="card">
        <img src={image} alt={title} className="card-img" />
        <div className="card-info">
          <h3 className="card-title">{title}</h3>
          <div className="card-subtitle">{subtitle}</div>
          <div className="card-pricing">
            <span className="card-old-price">₹{oldPrice}</span>
            <span className="card-price">₹{price}</span>
            <span className="card-discount">{discount}%</span>
            <div className="card-actions">
              <FaHeart className="action-icon" onClick={handleLike} />
              <BsBag className="action-icon" onClick={handleAddToCart} />
            </div>
          </div>
        </div>
      </div>

      {/* Login modal if user not logged in */}
      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSignup={() => {}}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          setShowLogin(false);
        }}
      />
    </>
  );
};

export default Card;
