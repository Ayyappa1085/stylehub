import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';

const Watches = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSidebarVisible(false);
  };

  return (
    <div className="main-content">
      {sidebarVisible && (
        <Sidebar selectedCategory="Watches" onItemSelect={handleItemSelect} visible={true} />
      )}
      <Body selectedCategory="Watches" selectedItem={selectedItem} className={sidebarVisible ? 'body with-sidebar' : 'body'} />
    </div>
  );
};

export default Watches;
