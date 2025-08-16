import { useEffect, useState } from "react";
import "./ImageScroller.css";

const images = [
  "/assets/shirtS.png",
  "/assets/womenS.jpg",
  "/assets/kidsS.jpg",
  "/assets/watchS.jpg",
];

const ImageScroller = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scroller-container">
      <div
        className="scroller-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, i) => (
          <div className="scroller-item" key={i}>
            <img src={src} alt={`slide-${i}`} />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="scroller-dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${currentIndex === i ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageScroller;
