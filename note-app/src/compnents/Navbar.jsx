import React, { useState } from 'react';
import Profileinfo from './Profileinfo';
import { useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';

const Navbar = ({ onSearchNote, userInfo }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery('');
    onSearchNote('');
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      <Searchbar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <Profileinfo onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
