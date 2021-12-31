import React, { useEffect } from "react";
import { useState } from "react";
import BottomNavigation from "../../components/bottom navigation/BottomNavigation";
import Sidebar from "../../components/sidebar/";
import Toolbar from "../../components/toolbar/Toolbar";

function PageWrapper(props) {
  const { children } = props;
  const [showSidebar, setShowSidebar] = useState(null);
  console.log("I am the showsiebar", showSidebar);
  useEffect(() => {}, [showSidebar]);
  return (
    <>
      <div className="page-wrapper">
        <div>
          <Sidebar onMount={(func) => setShowSidebar(() => func)} />
        </div>
        <div>
          <Toolbar showSidebar={showSidebar} />
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}

export default PageWrapper;
