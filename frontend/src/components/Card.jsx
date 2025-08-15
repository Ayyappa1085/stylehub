import './Card.css';
import { FaHeart } from 'react-icons/fa'; // Import wishlist icon
import { BsBag } from 'react-icons/bs';   // Import bag icon

const Card = ({ image, title, subtitle, price, oldPrice, discount }) => (
  <div className="card">
    <img src={image} alt={title} className="card-img" />
    <div className="card-info">
      <h3 className="card-title">{title}</h3>
      <div className="card-subtitle">{subtitle}</div>
      <div className="card-pricing">
        <span className="card-old-price">₹{oldPrice}</span>
        <span className="card-price">₹{price}</span>
        <span className="card-discount">{discount}%</span>
        
        {/* Container for the new icons */}
        <div className="card-actions">
          <FaHeart className="action-icon" />
          <BsBag className="action-icon" />
        </div>
      </div>
    </div>
  </div>
);

export default Card;