import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Cart from "./pages/cart/Cart";
import Home from "./pages/home/Home";
import News from "./pages/news/News";
import NewProductForm from "./pages/shop/forms/NewProductForm";
import NewShopForm from "./pages/shop/forms/NewShopForm";
import MarketPlace from "./pages/shop/MarketPlace";
import ShopManagement from "./pages/shop/ShopManagement";
import UserProfile from "./pages/user/UserProfile";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/registration/Register";
import Notice from "./components/notice/Notice";
function Router() {
  const authorised = true;
  return (
    <BrowserRouter>
      {authorised ? <ProtectedRoutes /> : <FreeRoutes />}
    </BrowserRouter>
  );
}

const FreeRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/browse/market-place" />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/" exact element={<Navigate to="/login" />} />
      <Route path="/browse/:page" exact element={<MarketPlace />} />
      <Route
        path="*"
        element={
          <Notice label="Oops, the page you are looking for does not exist..." />
        }
      />
    </Routes>
  );
};
const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/login" exact element={<Navigate to="/home" />} />
      <Route path="/register" exact element={<Navigate to="/home" />} />
      {/* ------------------------------------------------------------- */}
      <Route path="/home" exact element={<Home />} />
      <Route path="/browse/:page" exact element={<MarketPlace />} />
      <Route path="/user/control/:page/show" exact element={<Cart />} />
      <Route path="/news" exact element={<News />} />

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
        path="/user/manage/:page/:tab/edit-shop/:id"
        exact
        element={<NewShopForm />}
      />
      <Route
        path="/user/manage/:page/:tab/new-product"
        exact
        element={<NewProductForm />}
      />
      <Route
        path="/user/manage/:page/:tab/edit-product/:id"
        exact
        element={<NewProductForm />}
      />
      {/* <Route path="/shop/create/item" exact element={<CreateShopItem />} /> */}
      <Route path="/user/control/:page" exact element={<UserProfile />} />
      <Route
        path="*"
        element={
          <Notice label="Oops, the page you are looking for does not exist..." />
        }
      />
    </Routes>
  );
};
export default Router;
