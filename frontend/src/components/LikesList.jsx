import LikeCard from "./LikeCard";
import "./LikesList.css";

const LikesList = ({ likes, setUser }) => {
  const handleAddedToCart = (updatedCart) => {
    console.log("Cart updated:", updatedCart);
  };

  const handleRemovedFromLikes = (updatedLikes) => {
    setUser((prevUser) => ({ ...prevUser, likes: updatedLikes }));
  };

  if (!likes || likes.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        You haven’t liked any products yet.
      </p>
    );
  }

  return (
    <div className="likes-list">
      {likes.map((product) => (
        <LikeCard
          key={`${product.id}-${product.title}`}   // unique key
          product={product}
          onRemovedFromLikes={handleRemovedFromLikes}  
          onAddedToCart={handleAddedToCart}
        />
      ))}
    </div>
  );
};

export default LikesList;
