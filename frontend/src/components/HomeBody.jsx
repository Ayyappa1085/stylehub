import './HomeBody.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

// Each image has a route
const images = [
  { src: '/assets/men.png', route: '/men' },
  { src: '/assets/img11-min.png', route: '/women' },
  { src: '/assets/watchM.png', route: '/kids' },
  { src: '/assets/boy.png', route: '/watches' },
];

const HomeBody = () => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div className="homebody-container">
      <div className="homebody-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="homebody-images">
        {images.map((img, idx) => (
          <div
            className="homebody-image-box"
            key={idx}
            onClick={() => handleClick(img.route)}
            style={{ cursor: 'pointer' }}
          >
            <img src={img.src} alt={`img${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeBody;
