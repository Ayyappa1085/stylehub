
import { productData } from '../data/productData';
import CardList from './CardList';
import "./Body.css"

const Body = ({ selectedCategory, selectedItem, className }) => {
  let products = [];
  if (
    selectedCategory &&
    selectedItem &&
    productData[selectedCategory] &&
    productData[selectedCategory][selectedItem]
  ) {
    products = productData[selectedCategory][selectedItem];
  }
  return (
    <main className={className}>
      <h2>{selectedCategory} {selectedItem ? `> ${selectedItem}` : 'Items'}</h2>
      <CardList products={products} />
    </main>
  );
};

export default Body;