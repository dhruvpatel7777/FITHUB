import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRoute from "./Modules/user/Route/UserRoute";
import UserLoginRegister from "./Modules/user/component/Pages/UserLoginRegister";
import HomePage from "./Modules/user/component/Pages/HomePage";
import PricingSection from "./Modules/user/component/PricingSection";
import ProductSection from "./Modules/user/component/ProductSection";
import AboutUs from "./Modules/user/component/AboutUs";
import Classes from "./Modules/user/component/Classes";
import Cart from "./Modules/user/component/Cart";
import UserNotifications from "./Modules/user/component/UserNotifications";
import { AuthProvider } from "./Modules/user/component/GlobalContext";
import Status from "./Modules/user/component/Status";
import Nutrition from "./Modules/user/component/Pages/Nutrition";

function App() {

  return (
    <div>
      
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/neutrition" element={<Nutrition />} />
          <Route path="/login/*" element={<UserLoginRegister />} />
          <Route path="/user/*" element={<UserRoute />} />
          <Route path="/plans/*" element={<PricingSection />} />
          <Route
            path="/products/*"
            element={<ProductSection />}
          />
          <Route path="/classes/*" element={<Classes />} />
          <Route path="/status/*" element={<Status />} />
          <Route path="/aboutus/*" element={<AboutUs />} />
          <Route path="/notifications/*" element={<UserNotifications />} />
          <Route
            path="/cart/*"
            element={
              <Cart
              />
            }
          />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;