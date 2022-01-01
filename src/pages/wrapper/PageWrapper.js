import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../../components/sidebar/";
import Toolbar from "../../components/toolbar/Toolbar";

function PageWrapper(props) {
  const { children } = props;
  const [showSidebar, setShowSidebar] = useState(null);

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
