
import './App.css';
import React from 'react';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductManageConsole from './Components/Product_Man/ProductManageConsole';



function App() {
  return (
    <Router>
      <div>
      <Routes>
        {/* Route for the Product Management Console */}
        <Route path="/productconsole/*" element={<ProductManageConsole />} />
        {/* Route for the Product Management Console */}
      </Routes>
      </div>
    </Router>
  );
}

export default App;
