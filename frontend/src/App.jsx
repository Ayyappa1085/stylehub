import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Body from './components/Body';
import Footer from './components/Footer';
import ServiceFeatures from './components/ServiceFeatures';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Men');
  const [selectedItem, setSelectedItem] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSidebarVisible(true);
    setSelectedItem('');
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSidebarVisible(false);
  };

  return (
    <div className="app-container">
      <Header onCategorySelect={handleCategorySelect} />
      <div className="main-content">
        {sidebarVisible ? (
          <Sidebar
            selectedCategory={selectedCategory}
            onItemSelect={handleItemSelect}
            visible={sidebarVisible}
          />
        ) : null}
        <Body
          selectedCategory={selectedCategory}
          selectedItem={selectedItem}
          className={sidebarVisible ? 'body with-sidebar' : 'body'}
        />
      </div>
      
    </div>
  );
}

export default App;