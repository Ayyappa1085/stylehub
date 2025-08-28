import "./Checkout.css";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../App";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const Checkout = ({ cart }) => {
  const { user, setUser } = useContext(UserContext);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const ok = await loadRazorpayScript();
    if (!ok) {
      alert("Failed to load Razorpay. Please check your connection.");
      return;
    }

    const options = {
      key: "rzp_test_nKPAWKJBjDN0HX",
      amount: totalPrice * 100, // in paise
      currency: "INR",
      name: "StyleHub",
      description: "Cart Payment",
      handler: async function (response) {
        try {
          // ✅ fixed URL (removed extra /api)
          const res = await axios.post("/users/order", {
            paymentId: response.razorpay_payment_id,
          });

          if (res.data?.user) {
            setUser(res.data.user);
          }

          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        } catch (err) {
          console.error("Error finalizing order:", err);
          alert("Payment succeeded, but failed to save order. Contact support.");
        }
      },
      prefill: {
        name: user?.name || "StyleHub User",
        email: user?.email || "",
        contact: user?.mobile || "",
      },
      theme: { color: "#DB4444" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="checkout">
      <h3>Order Summary</h3>
      <ul className="checkout-list">
        {cart.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            {item.title} - ₹{item.price}
          </li>
        ))}
      </ul>
      <h4>Total: ₹{totalPrice}</h4>
      <button className="checkout-btn" onClick={handlePayment}>
        Proceed to Pay
      </button>
    </div>
  );
};

export default Checkout;
