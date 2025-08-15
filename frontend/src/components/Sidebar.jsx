
import './Sidebar.css';

const itemsMap = {
  Men: ['Shirts', 'Pants'],
  Women: ['Sarees', 'Kurtas'],
  Kids: ['Shirts', 'Pants', 'Belt'],
  Watches: ['Analog'],
};


const Sidebar = ({ selectedCategory, onItemSelect, visible }) => {
  if (!visible) return null;
  return (
    <aside className="sidebar">
      <ul>
        {itemsMap[selectedCategory].map(item => (
          <li key={item} onClick={() => onItemSelect(item)}>{item}</li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;