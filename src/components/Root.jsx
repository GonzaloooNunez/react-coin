import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Coin from './Coin';
import Favorites from './Favorites';
import NavigationBar from './NavigationBar';

const Root = () => {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<Coin />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Root;