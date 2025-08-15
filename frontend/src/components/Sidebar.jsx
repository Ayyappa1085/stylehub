import './Sidebar.css';

const itemsMap = {
  Men: ['Shirts', 'Pants', 'Watches'],
  Women: ['Sarees', 'Kurtas'],
  Kids: ['Shirts', 'Pants', 'Belt'],
};

const Sidebar = ({ selectedCategory, onItemSelect }) => (
  <aside className="sidebar">
    <ul>
      {itemsMap[selectedCategory].map(item => (
        <li key={item} onClick={() => onItemSelect(item)}>{item}</li>
      ))}
    </ul>
  </aside>
);

export default Sidebar;