import React from "react";
import BottomNavigation from "./components/bottom navigation/BottomNavigation";
import Sidebar from "./components/sidebar";
import Toolbar from "./components/toolbar/Toolbar";

export default function App() {
  return (
    <div>
      <Toolbar />
      <BottomNavigation />
    </div>
  );
}
