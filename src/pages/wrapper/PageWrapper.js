import React, { useEffect } from "react";
import { useState } from "react";
import BottomNavigation from "../../components/bottom navigation/BottomNavigation";
import Sidebar from "../../components/sidebar/";
import Toolbar from "../../components/toolbar/Toolbar";

function PageWrapper(props) {
  const { children, showBack } = props;
  const [showSidebar, setShowSidebar] = useState(null);

  useEffect(() => {}, [showSidebar]);
  return (
    <>
      <div className="page-wrapper">
        <div>
          <Sidebar onMount={(func) => setShowSidebar(() => func)} />
        </div>
        <div>
          <Toolbar showSidebar={showSidebar} showBack={showBack} />
          <div className="page-content">
            <div
              className="page-inner-wrapper"
              style={{ marginTop: showBack ? 40 : 0 }}
            >
              {children}
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    </>
  );
}

export default PageWrapper;
