import Card from './Card';
import './CardList.css';

const shirtsData = [
  {
    image: '../assets/shirt1.webp',
    title: 'COTTON STRETCH SHIRT',
    subtitle: 'BENEDICT - DARK GREY',
    oldPrice: 3499,
    price: 1994,
    discount: 43,
  },
  {
    image: '../assets/shirt2.webp',
    title: 'ABSTRACT PRINT SHIRT',
    subtitle: 'PAINTER - GREEN',
    oldPrice: 3199,
    price: 1567,
    discount: 51,
  },
  {
    image: '../assets/shirt3.webp',
    title: 'LINEN BLEND TURKISH 3 ...',
    subtitle: 'THRONE LS-25 - TEAL',
    oldPrice: 3999,
    price: 2799,
    discount: 30,
  },
  {
    image: '../assets/shirt4.webp',
    title: 'TONAL CHECK SHIRT',
    subtitle: 'SANTHE - MAROON',
    oldPrice: 3999,
    price: 1959,
    discount: 51,
  },
    {
    image: '../assets/shirt1.webp',
    title: 'TONAL CHECK SHIRT',
    subtitle: 'SANTHE - MAROON',
    oldPrice: 3999,
    price: 1959,
    discount: 51,
  },
    {
    image: '../assets/shirt2.webp',
    title: 'TONAL CHECK SHIRT',
    subtitle: 'SANTHE - MAROON',
    oldPrice: 3999,
    price: 1959,
    discount: 51,
  },
];

const CardList = ({ show }) => {
  if (!show) return null;
  return (
    <div className="card-list">
      {shirtsData.map((shirt, idx) => (
        <Card key={idx} {...shirt} />
      ))}
    </div>
  );
};


export default CardList;