import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/shop" exact element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
