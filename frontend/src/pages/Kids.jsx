import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';

const Kids = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const location = useLocation();

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSidebarVisible(false);
  };

  useEffect(() => {
    setSelectedItem('');
    setSidebarVisible(true);
  }, [location.key]);

  return (
    <div className="main-content" key={location.key}>
      {sidebarVisible && (
        <Sidebar selectedCategory="Kids" onItemSelect={handleItemSelect} visible={true} />
      )}
      <Body selectedCategory="Kids" selectedItem={selectedItem} className={sidebarVisible ? 'body with-sidebar' : 'body'} />
    </div>
  );
};

export default Kids;
