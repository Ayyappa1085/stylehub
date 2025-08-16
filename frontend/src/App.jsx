import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import Account from './pages/Account';
import Watches from './pages/Watches';


function App() {
  const [selectedCategory, setSelectedCategory] = useState('Men');
  const [selectedItem, setSelectedItem] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSidebarVisible(true);
    setSelectedItem('');
  };

 

  return (
    <Router>
      <Header onCategorySelect={handleCategorySelect} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/account" element={<Account />} />
        <Route path="/watches" element={<Watches />} />
      </Routes>
    </Router>
  );
}


export default App;