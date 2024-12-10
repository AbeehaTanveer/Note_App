import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { SearchValueContext } from '../context/SearchContext';

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useContext(SearchValueContext);  // Get loggedIn status from context

  // If not logged in, redirect to the Register page
  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return children;  // Render the children (Home page) if logged in
};

export default PrivateRoute;
