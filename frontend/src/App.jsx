import { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import Account from './pages/Account';
import Watches from './pages/Watches';
import Likes from './pages/Likes';
import Cart from './pages/Cart';

export const UserContext = createContext();

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Men');
  const [selectedItem, setSelectedItem] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [user, setUser] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSidebarVisible(true);
    setSelectedItem('');
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Header onCategorySelect={handleCategorySelect} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/account" element={<Account />} />
          <Route path="/watches" element={<Watches />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}


export default App;