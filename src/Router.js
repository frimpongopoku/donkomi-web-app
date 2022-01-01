import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home";
import News from "./pages/news/News";
import Shop from "./pages/shop/Shop";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />} />
        {/* <Route path = "*" /> */}
      </Routes>
      <ProtectedRoutes />
    </BrowserRouter>
  );
}

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/home" exact element={<Home />} />
      <Route path="/shop" exact element={<Shop />} />
      <Route path="/news" exact element={<News />} />
    </Routes>
  );
};
export default Router;
