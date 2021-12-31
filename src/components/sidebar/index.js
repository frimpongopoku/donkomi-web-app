import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function SidebarWrapper() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="pc-vanish">
        {show && (
          <>
            <div className="side-overlay" onClick={() => setShow(false)}></div>
            <div className=" mobile-sidebar">
              <Sidebar />
            </div>
          </>
        )}
      </div>
      <div className="phone-vanish">
        <Sidebar />
      </div>
    </div>
  );
}
