import React, { createContext, useState } from "react";

// Create the context
const SearchValueContext = createContext();

const SearchValueProvider = ({ children }) => {
  // State for search value
  const [search, setSearch] = useState("");

  // Function to handle search value changes
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const [loggedIn,setLoggedIn]=useState(true)



  return (
    <SearchValueContext.Provider value={{ search, handleSearchChange,setLoggedIn,loggedIn }}>
      {children} {/* This will render nested components */}
    </SearchValueContext.Provider>
  );
};

export { SearchValueContext, SearchValueProvider };
