import React from 'react';
import SearchBar from '../Pages/SearchBar';
import AvatarProfile from '../Pages/AvatarProfile';
import MenuIcon from '@mui/icons-material/Menu';

const Nav = () => {
  return (
    <div className="w-full">
      <header className="bg-gradient-to-r from-[#d9a7c7] to-[#cab3b8] w-full">
        <div className="flex justify-between items-center p-5 flex-wrap">
          {/* Logo */}
          <div className="font-bold text-2xl tracking-tight flex items-center">
            <span className="text-[#ac2d51] text-3xl">Note</span> Track
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block w-full lg:w-auto ">
            <SearchBar />
          </div>

          {/* Avatar Profile */}
          <div className="flex items-center gap-4">
            <div>
              <AvatarProfile  />
            </div>

         
          </div>
        </div>

        {/* Search Bar for Mobile */}
        <div className="block lg:hidden w-full mt-2">
          <SearchBar />
        </div>
      </header>
    </div>
  );
};

export default Nav;
