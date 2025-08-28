import { FaTrash } from "react-icons/fa";
import axios from "axios";
import "./CartCard.css";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const CartCard = ({ product, onRemovedFromCart }) => {
  const handleRemoveFromCart = async () => {
  try {
    const res = await axios.post("/users/remove-cart", {
      productId: product.id,
      title: product.title,
    });

    if (res.data.cart) {
  onRemovedFromCart([...res.data.cart]); // ✅ clone to force re-render
}

  } catch (err) {
    console.error("Error removing from cart:", err);
  }
};



  return (
    <div className="cart-card">
      <img src={product.image} alt={product.title} className="cart-card-img" />
      <div className="cart-card-details">
        <h3>{product.title}</h3>
        <p>{product.subtitle}</p>
        <p>
          <strong>₹{product.price}</strong>{" "}
          {product.oldPrice && (
            <span className="old-price">₹{product.oldPrice}</span>
          )}
        </p>
      </div>
      <div className="cart-card-actions">
        <button className="cart-card-remove" onClick={handleRemoveFromCart}>
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartCard;
