import React, { useState } from 'react';
import Profileinfo from './Profileinfo';
import { useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';

const Navbar = () => {
   const [searchQuery, setSearchQuery] = useState("");
   const navigate = useNavigate();

   const onLogout = () => {
      localStorage.clear();
      navigate('/login');
   };

   const handleSearch = () => {
      console.log("Searching for:", searchQuery);
   };

   const onClearSearch = () => {
      setSearchQuery("");
   };

   return (
      <>
         <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
            <h2 className='text-xl font-medium text-black py-2'>Notes</h2>

            <Searchbar
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)} 
               handleSearch={handleSearch}
               onClearSearch={onClearSearch}
            />

            <Profileinfo onLogout={onLogout} />
         </div>
      </>
   );
}

export default Navbar;
