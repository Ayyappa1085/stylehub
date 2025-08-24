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

  // Check if product is liked
  // Ensure likes are unique by product.id
  const isLiked = user && Array.isArray(user.likes)
    ? user.likes.some((p) => String(p.id) === String(product.id))
    : false;

  const handleLike = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    try {
      if (isLiked) {
        // Remove from wishlist
        await axios.post('/users/unlike', { productId: product.id, title: product.title });
      } else {
        // Add to wishlist only if not already present
        if (!user.likes.some((p) => String(p.id) === String(product.id))) {
          await axios.post('/users/like', { product });
        }
      }
      const me = await axios.get('/users/me');
      setUser(me.data.user);
    } catch (err) {
      alert(err.response?.data?.error || (isLiked ? 'Error removing from likes' : 'Error adding to likes'));
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
              <FaHeart
                className="action-icon"
                onClick={handleLike}
                style={{ color: isLiked ? '#d3a892' : undefined, transition: 'color 0.2s' }}
              />
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
