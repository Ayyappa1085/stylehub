import './Body.css';
import CardList from './CardList';

const itemsMap = {
  Men: ['Shirts', 'Pants', 'Watches'],
  Women: ['Sarees', 'Kurtas'],
  Kids: ['Shirts', 'Pants', 'Belt'],
};

const Body = ({ selectedCategory, selectedItem, className }) => (
  <main className={className}>
    <h2>{selectedCategory} Items</h2>
    {selectedItem === 'Shirts' && <CardList show={true} />}
    {/* Add similar logic for other items */}
  </main>
);

export default Body;