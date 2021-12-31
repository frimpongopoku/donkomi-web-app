import React from "react";
import BottomNavigation from "../../components/bottom navigation/BottomNavigation";
import Sidebar from "../../components/sidebar/";
import Toolbar from "../../components/toolbar/Toolbar";

function PageWrapper(props) {
  const { children } = props;
  return (
    <>
      <Toolbar />
      <div>{children}</div>
      <Sidebar />
      <BottomNavigation />
    </>
  );
}

export default PageWrapper;
