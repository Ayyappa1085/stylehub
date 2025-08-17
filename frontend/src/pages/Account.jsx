import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";

const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Re-hydrate user on refresh using session cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("http://localhost:5000/api/users/me", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          setUser(null);
          setError("Not logged in");
        } else {
          const data = await res.json();
          // /me returns { user: {...} }
          setUser(data.user);
        }
      } catch (e) {
        console.error(e);
        setError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    if (!user) fetchUser();
    else setLoading(false);
  }, [user, setUser]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      // ignore network errors here
    } finally {
      setUser(null);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You are not logged in.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Account</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Mobile:</strong> {user.mobile}</p>
      <p><strong>Address:</strong> {user.address}</p>

      <div style={{ marginTop: 16 }}>
        <h3>Likes</h3>
        {Array.isArray(user.likes) && user.likes.length > 0 ? (
          <ul>
            {user.likes.map((p, idx) => (
              <li key={idx}>{typeof p === 'string' ? p : p.title || p.id}</li>
            ))}
          </ul>
        ) : (
          <p>No liked items</p>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>Cart</h3>
        {Array.isArray(user.cart) && user.cart.length > 0 ? (
          <ul>
            {user.cart.map((p, idx) => (
              <li key={idx}>{typeof p === 'string' ? p : p.title || p.id}</li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      <button
        onClick={handleLogout}
        style={{ marginTop: 24, padding: "10px 16px", cursor: "pointer" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
