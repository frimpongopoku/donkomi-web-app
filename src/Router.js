import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App";
import Cart from "./pages/cart/Cart";
import Home from "./pages/home/Home";
import News from "./pages/news/News";
import CreateShop from "./pages/shop/CreateShop";
import CreateShopItem from "./pages/shop/CreateShopItem";
import NewProductShop from "./pages/shop/forms/NewProductShop";
import NewShopForm from "./pages/shop/forms/NewShopForm";
import MarketPlace from "./pages/shop/MarketPlace";
import ShopManagement from "./pages/shop/ShopManagement";
import UserProfile from "./pages/user/UserProfile";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
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
      <Route path="/browse/:page" exact element={<MarketPlace />} />
      {/* <Route path="/user/show-my-cart" exact element={<Cart />} /> */}
      <Route path="/user/control/:page/show" exact element={<Cart />} />
      <Route path="/news" exact element={<News />} />
      <Route path="/shop/create" exact element={<CreateShop />} />
      <Route
        path="/user/manage/:page/:tab"
        exact
        element={<ShopManagement />}
      />
      <Route
        path="/user/manage/:page/:tab/new-shop"
        exact
        element={<NewShopForm />}
      />
      <Route
        path="/user/manage/:page/:tab/new-product"
        exact
        element={<NewProductShop />}
      />
      {/* <Route path="/shop/create/item" exact element={<CreateShopItem />} /> */}
      <Route path="/user/control/:page" exact element={<UserProfile />} />
    </Routes>
  );
};
export default Router;
