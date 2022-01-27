import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import BottomNavigation from "../../components/bottom navigation/BottomNavigation";
import { DonkomiAlert } from "../../components/form generator/notification/Notification";
import Sidebar from "../../components/sidebar/";
import Toolbar from "../../components/toolbar/Toolbar";
import {
  reduxSetDonkomiAuth,
  reduxSetFirebaseAUth,
} from "../../redux/actions/actions";

function PageWrapper(props) {
  const { children, showBack, fireAuth } = props;
  const [showSidebar, setShowSidebar] = useState(null);
  const goTo = useNavigate();

  useEffect(() => {}, [showSidebar, fireAuth]);
  return (
    <>
      <div className="page-wrapper">
        <div>
          <Sidebar onMount={(func) => setShowSidebar(() => func)} {...props} />
        </div>
        <div>
          <Toolbar showSidebar={showSidebar} showBack={showBack} />
          <div className="page-content">
            <div
              className="page-inner-wrapper"
              style={{ marginTop: showBack ? 40 : 0 }}
            >
              {!fireAuth && (
                <DonkomiAlert
                  style={{ marginBottom: 12 }}
                  onClick={() => goTo("/login")}
                >
                  {" "}
                  Sign In or Register, whenever you are ready{" "}
                </DonkomiAlert>
              )}

              {children}
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    </>
  );
}

export const mapStateToProps = (state) => {
  return { fireAuth: state.fireAuth, user: state.user };
};
export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateFireState: reduxSetFirebaseAUth,
      updateUserState: reduxSetDonkomiAuth,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper);
