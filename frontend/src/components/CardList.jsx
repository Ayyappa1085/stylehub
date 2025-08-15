import Card from './Card';
import './CardList.css';
const CardList = ({ products }) => {
  if (!products || products.length === 0) return null;
  return (
    <div className="card-list">
      {products.map((product, idx) => (
        <Card key={idx} {...product} />
      ))}
    </div>
  );
};


export default CardList;