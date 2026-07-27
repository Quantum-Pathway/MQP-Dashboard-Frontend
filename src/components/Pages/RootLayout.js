import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, useAnimate } from "framer-motion";
import { Outlet } from "react-router-dom";
import TopBar from "@components/Layout/TopBar/TopBar";
import MainNavigation from "@components/Layout/MainNavigation/MainNavigation";
import NavbarHeader from "@components/Layout/MainNavigation/NavbarHeader";
import Footer from "@components/Layout/Footer/Footer";
import SessionExpirationManager from "../../auth/SessionExpirationManager";
import SessionExpirationModal from "../../auth/SessionExpirationModal";
import ToggleButton from "@components/UI/Button/ToggleButton";

const MIN_WIDTH_SIDEBAR = 80;
const MAX_WIDTH_SIDEBAR = 265;

/** Main authenticated layout with sidebar, topbar, and session handling */
const RootLayout = () => {
  const darkmode = useSelector((state) => state.accessibilities.darkmode);
  const [minSidebar, setMinSidebar] = useState(true);
  const [scope, animate] = useAnimate();

  const leftSidebarToggleHandler = () => {
    setMinSidebar((prevSidebar) => !prevSidebar);
    animate(
      "div.left_sidebar_wrap, div.left_topbar",
      { width: minSidebar ? MIN_WIDTH_SIDEBAR : MAX_WIDTH_SIDEBAR },
      { duration: 0.6, type: "spring" },
    );
  };

  return (
    <React.Fragment>
      <SessionExpirationManager />
      <SessionExpirationModal />

      <div className="fluid-container body_container" ref={scope}>
        <div className="mx-0 topbar_container">
          <div className={`left_topbar ${!minSidebar ? "minimized" : ""}`}>
            <AnimatePresence>{minSidebar && <NavbarHeader />}</AnimatePresence>
            <ToggleButton
              id="toggle_left_sidebar"
              aria-controls="left_sidebar"
              data-target="left_sidebar"
              aria-label="Toggle Left Sidebar"
              label="Toggle Left Sidebar"
              className={`toggle_btn ${!minSidebar ? "collapsed" : ""}`}
              onToggle={leftSidebarToggleHandler}
            />
          </div>
          <div className="right_topbar">
            <AnimatePresence>
              <TopBar />
            </AnimatePresence>
          </div>
        </div>
        <div className="mx-0 root_container">
          <div className="left_sidebar_wrap">
            <AnimatePresence>
              <MainNavigation onHidden={minSidebar} />
            </AnimatePresence>
          </div>

          <div
            className={`right_content ${darkmode ? "darkgrey_bg" : "lightgrey_bg"}`}
          >
            <div className={` mx-0 main_content_container `}>
              <Outlet />
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RootLayout;
