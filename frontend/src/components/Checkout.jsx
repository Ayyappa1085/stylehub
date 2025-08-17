import "./Checkout.css";

const Checkout = ({ cart }) => {
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="checkout">
      <h3>Order Summary</h3>
      <ul className="checkout-list">
        {cart.map((item, index) => (
          <li key={index}>
            {item.title} - ₹{item.price}
          </li>
        ))}
      </ul>
      <h4>Total: ₹{totalPrice}</h4>
      <button className="checkout-btn">Proceed to Pay</button>
    </div>
  );
};

export default Checkout;
