import React from "react";
import BottomNavigation from "../../components/bottom navigation/BottomNavigation";
import Sidebar from "../../components/sidebar/";
import Toolbar from "../../components/toolbar/Toolbar";

function PageWrapper(props) {
  const { children } = props;
  return (
    <>
      <div className="page-wrapper">
        <div>
          <Sidebar />
        </div>
        <div>
          <Toolbar />
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}

export default PageWrapper;
