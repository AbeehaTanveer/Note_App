import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Register from './components/Register.jsx';
import Home from './components/Home.jsx';
import { SearchValueProvider } from './context/SearchContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx'; // Import PrivateRoute

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <SearchValueProvider>
        <Routes>
          <Route path="/" element={<Register />} />
          
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </SearchValueProvider>
    </BrowserRouter>
    
  </StrictMode>
);
