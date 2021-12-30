import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/home" exact element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
