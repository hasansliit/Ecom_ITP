
import React from "react";
import { Route, Routes } from "react-router-dom";


import AdminPromotion from "./promo/AdminPromotion.jsx";
import DisplayPromotion from "./promo/DisplayPromotion.jsx";
import AddPromotion from "./promo/AddPromotion.jsx";
import UpdatePromotion from "./promo/UpdatePromotion.jsx";



function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/allPromo" element={<DisplayPromotion/>} />
          <Route path="/addPromo" element={<AddPromotion/>} />
          <Route path="/update/:id" element={<UpdatePromotion/>} />
          <Route path="/adminPromo" element={<AdminPromotion />} />
          
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
