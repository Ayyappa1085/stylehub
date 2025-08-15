import './Card.css';

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
      </div>
      
    </div>
  </div>
);

export default Card;