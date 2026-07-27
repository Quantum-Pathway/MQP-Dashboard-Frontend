import React from 'react';
import Navigation from './Navigation';
import UserNavigation from '@components/Layout/MainNavigation/UserNav';

/** Left sidebar with main and user navigation */
function MainNavigation({ id, onHidden }) {
  return (
    <div className={`left_sidebar `} id="left_sidebar">
      <div className="main_navigation" id={id ? id : " "}>
        <div className="left_navbar">
          <Navigation onHidden={onHidden} />
          <UserNavigation onHidden={onHidden} />
        </div>
      </div>
    </div>
  );
}

export default MainNavigation;
