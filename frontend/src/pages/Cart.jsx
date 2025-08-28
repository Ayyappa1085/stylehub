import { useEffect, useState, useContext } from "react";
import axios from "axios";
import CartList from "../components/CartList";
import Checkout from "../components/Checkout";
import { UserContext } from "../App";
import "./Cart.css";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const Cart = ({ className }) => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("/users/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [setUser]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (!user) {
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        Please login to view your cart.
      </p>
    );
  }

  return (
    <main className={`cart-page ${className}`}>
      <h2 style={{ textAlign: "center", marginBottom: "32px" }}>Your Cart</h2>
      <div className="cart-container">
        <div className="cart-left">
          <CartList cart={user.cart} setUser={setUser} />
        </div>
        <div className="cart-right">
          <Checkout cart={user.cart} />
        </div>
      </div>
    </main>
  );
};

export default Cart;
