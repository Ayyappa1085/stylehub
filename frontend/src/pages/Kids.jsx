import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';

const Kids = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSidebarVisible(false);
  };

  return (
    <div className="main-content">
      {sidebarVisible && (
        <Sidebar selectedCategory="Kids" onItemSelect={handleItemSelect} visible={true} />
      )}
      <Body selectedCategory="Kids" selectedItem={selectedItem} className={sidebarVisible ? 'body with-sidebar' : 'body'} />
    </div>
  );
};

export default Kids;
