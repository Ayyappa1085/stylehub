import CartCard from "./CartCard";
import "./CartList.css";

const CartList = ({ cart, setUser }) => {
  const handleRemovedFromCart = (updatedCart) => {
    setUser((prevUser) => ({
      ...prevUser,
      cart: updatedCart, // updates user in context
    }));
  };

  // ✅ use the latest cart (not stale prop)
  const currentCart = cart || [];

  if (currentCart.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        Your cart is empty.
      </p>
    );
  }

  return (
    <div className="cart-list">
      {currentCart.map((product) => (
        <CartCard
          key={`${product.id}-${product.title}`}
          product={product}
          onRemovedFromCart={handleRemovedFromCart}
        />
      ))}
    </div>
  );
};

export default CartList;
