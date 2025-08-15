import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Body from './components/Body';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Men');
  const [selectedItem, setSelectedItem] = useState('');

  return (
    <div className="app-container">
      <Header onCategorySelect={setSelectedCategory} />
      <div className="main-content">
        <Sidebar
          selectedCategory={selectedCategory}
          onItemSelect={setSelectedItem}
        />
        <Body selectedCategory={selectedCategory} selectedItem={selectedItem} />
      </div>
    </div>
  );
}

export default App;