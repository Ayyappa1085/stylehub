
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import "./Account.css";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=User&background=random";

const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("details"); // details | orders | track
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState(null);
  const [trackLoading, setTrackLoading] = useState(false);

  // Re-hydrate user on refresh using session cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          setUser(null);
          setError("Not logged in");
        } else {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (e) {
        setError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };
    if (!user) fetchUser();
    else setLoading(false);
  }, [user, setUser]);

  // Fetch orders for user
  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/getorders`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        setOrders([]);
      } else {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch {
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  // Track order by ID
  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackId) return;
    setTrackLoading(true);
    setTrackResult(null);
    try {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/track/${trackId}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        setTrackResult({ status: "Order not found" });
      } else {
        const data = await res.json();
        setTrackResult({ status: data.status });
      }
    } catch {
      setTrackResult({ status: "Order not found" });
    } finally {
      setTrackLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
  await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {}
    setUser(null);
    window.location.href = "/"; // redirect to login/home
  };

  // Handle Orders button click
  const handleOrdersClick = () => {
    setView("orders");
    // If user object already has orders, use them
    if (user && Array.isArray(user.orders) && user.orders.length > 0) {
      setOrders(user.orders);
      setOrdersLoading(false);
    } else {
      fetchOrders();
    }
  };

  // Handle Track button click
  const handleTrackClick = () => {
    setView("track");
    setTrackId("");
    setTrackResult(null);
  };

  if (loading) return <div className="account-center"><div className="account-card"><p>Loading...</p></div></div>;
  if (!user) return <div className="account-center"><div className="account-card"><p>You are not logged in.</p></div></div>;

  return (
    <div className="account-center">
      <div className="account-card">
        <div className="avatar-section">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="avatar-img"
            />
          ) : (
            <div className="avatar-img" style={{display:'flex',alignItems:'center',justifyContent:'center',background:'#f9e9e2',fontSize:'2.2rem',fontWeight:'bold',color:'#cb9d89'}}>
              {user.name ? user.name.substring(0,2).toUpperCase() : "US"}
            </div>
          )}
        </div>
        <div className={`fade-section ${view === "details" ? "active" : ""}`}>
          <h2 style={{ marginBottom: 8 }}>My Account</h2>
          <div className="user-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobile}</p>
            <p><strong>Address:</strong> {user.address}</p>
          </div>
        </div>
        <div className={`fade-section ${view === "orders" ? "active" : ""}`}>
          <h2 style={{ marginBottom: 8 }}>My Orders</h2>
          {ordersLoading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <ul className="orders-list">
              {orders.map((order, idx) => (
                <li key={order.orderId || idx} className="order-item">
                  <div><strong>Order ID:</strong> {order.orderId}</div>
                  <div><strong>Total:</strong> ₹{order.total}</div>
                  <div><strong>Date:</strong> {order.date ? new Date(order.date).toLocaleString() : "-"}</div>
                  {order.createdAt && (
                    <div><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</div>
                  )}
                  {order.updatedAt && (
                    <div><strong>Updated At:</strong> {new Date(order.updatedAt).toLocaleString()}</div>
                  )}
                  <div><strong>Items:</strong></div>
                  <ul style={{ marginLeft: 16 }}>
                    {order.items && order.items.length > 0 ? order.items.map((item, i) => (
                      <li key={item.id || i}>{item.title} - ₹{item.price}</li>
                    )) : <li>No items</li>}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={`fade-section ${view === "track" ? "active" : ""}`}>
          <h2 style={{ marginBottom: 8 }}>Track Order</h2>
          <form className="track-form" onSubmit={handleTrack}>
            <input
              type="text"
              placeholder="Enter Order ID"
              value={trackId}
              onChange={e => setTrackId(e.target.value)}
              className="track-input"
              required
            />
            <button type="submit" className="track-btn">Track</button>
          </form>
          {trackLoading ? (
            <p>Searching...</p>
          ) : trackResult ? (
            <p>Order Status: {trackResult.status}</p>
          ) : null}
        </div>
        <div className="buttons-section">
          <button className="orders-btn" onClick={handleOrdersClick}>Orders</button>
          <button className="track-btn-main" onClick={handleTrackClick}>Track</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Account;
