import React, { useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { SearchValueContext } from '../context/SearchContext';

const SearchBar = () => {

  const { search, handleSearchChange } = useContext(SearchValueContext);
  return (
    <div>
      <label className="relative block w-full">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <SearchIcon className="text-slate-300" />
        </span>
        <input
        value={search}
        onChange={handleSearchChange}
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full lg:w-[600px] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-pink-500 focus:ring-pink-500 focus:ring-1 sm:text-sm"
          placeholder="What are you looking for..."
          type="text"
          name="search"
        />
      </label>
  
    </div>
  );
};

export default SearchBar;
