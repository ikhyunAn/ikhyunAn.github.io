import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import ProfileSidebar from "./ProfileSidebar";

const SiteLayout = () => {
  const { pathname } = useLocation();

  const skipToContent = (event) => {
    event.preventDefault();
    document.getElementById("main-content")?.focus();
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content" onClick={skipToContent}>
        Skip to main content
      </a>
      <NavBar />
      <div className="site-panel">
        <ProfileSidebar />
        <main id="main-content" className="page-content" tabIndex="-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SiteLayout;
