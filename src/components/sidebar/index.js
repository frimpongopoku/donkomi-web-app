import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function SidebarWrapper({ onMount }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (onMount) onMount(setShow);
  }, []);

  return (
    <div>
      <div className="pc-vanish">
        {show && (
          <>
            <div className="side-overlay" onClick={() => setShow(false)}></div>
            <div className=" mobile-sidebar">
              <Sidebar animate />
            </div>
          </>
        )}
      </div>
      <div className="phone-vanish">
        <div className="pc-sidebar">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
