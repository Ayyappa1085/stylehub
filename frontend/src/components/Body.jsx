import { productData } from '../data/productData';
import CardList from './CardList';
import "./Body.css";
import ImageScroller from './ImageScroller';

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

  // Show summary if no item is selected
  const showSummary = selectedCategory && !selectedItem && productData[selectedCategory];

  return (
    <main className={className}>
      <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>
        {selectedCategory} {selectedItem ? `> ${selectedItem}` : 'Items'}
      </h2>

      {showSummary ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh', // centers vertically
          }}
        >
          <ImageScroller />
        </div>
      ) : (
        <CardList products={products} />
      )}
    </main>
  );
};

export default Body;
