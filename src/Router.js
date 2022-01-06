import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home";
import News from "./pages/news/News";
import CreateShop from "./pages/shop/CreateShop";
import CreateShopItem from "./pages/shop/CreateShopItem";
import MarketPlace from "./pages/shop/MarketPlace";
import ShopManagement from "./pages/shop/ShopManagement";
import UserProfile from "./pages/user/UserProfile";

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
      <Route path="/market-place" exact element={<MarketPlace />} />
      <Route path="/news" exact element={<News />} />
      <Route path="/shop/create" exact element={<CreateShop />} />
      <Route path="/shop/manage" exact element={<ShopManagement />} />
      <Route path="/shop/create/item" exact element={<CreateShopItem />} />
      <Route path="/user/profile" exact element={<UserProfile />} />
    </Routes>
  );
};
export default Router;
