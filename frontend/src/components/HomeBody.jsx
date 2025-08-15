import './HomeBody.css';
import logo from '../assets/logo.png';

const images = [
  '/public/assets/men.png',
  '/public/assets/img11-min.png',
  '/public/assets/watchM.png',
  '/public/assets/boy.png',
  
];

const HomeBody = () => (
  <div className="homebody-container">
    <div className="homebody-logo">
      <img src={logo} alt="Logo" />
    </div>
    <div className="homebody-images">
      {images.map((img, idx) => (
        <div className="homebody-image-box" key={idx}>
          <img src={img} alt={`img${idx+1}`} />
        </div>
      ))}
    </div>
  </div>
);

export default HomeBody;
