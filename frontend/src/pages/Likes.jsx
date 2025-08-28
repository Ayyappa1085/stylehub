import { useEffect, useState, useContext } from "react";
import axios from "axios";
import LikesList from "../components/LikesList";
import "../components/Body.css";
import { UserContext } from "../App";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

const Likes = ({ className }) => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get("/users/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching likes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLikes();
  }, [setUser]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (!user) {
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        Please login to view your liked products.
      </p>
    );
  }

  return (
  <main className={className}>
    <h2 style={{ textAlign: "center", marginBottom: "32px" }}>Liked Products</h2>
    {user.likes && user.likes.length > 0 ? (
      <LikesList likes={user.likes} setUser={setUser} />
    ) : (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        You haven’t liked any products yet.
      </p>
    )}
  </main>
);
}
export default Likes;
