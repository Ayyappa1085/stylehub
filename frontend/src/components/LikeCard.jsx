import { FaCartPlus, FaHeartBroken } from "react-icons/fa";
import axios from "axios";
import "./LikeCard.css";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

const LikeCard = ({ product, onAddedToCart, onRemovedFromLikes }) => {
  const handleAddToCart = async () => {
    try {
      const res = await axios.post("/users/cart", { product });
      onAddedToCart(res.data.cart);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const handleRemoveLike = async () => {
    try {
      const res = await axios.post("/users/unlike", {
        productId: product.id,
        title: product.title,
      });

      // update parent state with new likes array from backend
      onRemovedFromLikes(res.data.likes);
    } catch (err) {
      console.error("Error removing from likes:", err);
    }
  };

  return (
    <div className="like-card">
      <img src={product.image} alt={product.title} className="like-card-img" />
      <div className="like-card-details">
        <h3>{product.title}</h3>
        <p>{product.subtitle}</p>
        <p>
          <strong>₹{product.price}</strong>{" "}
          {product.oldPrice && (
            <span className="old-price">₹{product.oldPrice}</span>
          )}
        </p>
      </div>
      <div className="like-card-actions">
        <button className="like-card-bag" onClick={handleAddToCart}>
          <FaCartPlus size={20} />
        </button>
        <button className="like-card-dislike" onClick={handleRemoveLike}>
          <FaHeartBroken size={20} />
        </button>
      </div>
    </div>
  );
};

export default LikeCard;
