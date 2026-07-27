import React from "react";
import LoginButton from "./LoginButton";
import ResourceStatusTable from "./ResourceStatus";
import Footer from "@components/Layout/Footer/Footer";
import {
  getLandingPageLogo,
  getLandingBackground,
} from "@utils/get-user-logos";

import "./Welcome.scss";

const WelcomeRoot = () => {
  const user_logos_path = process.env.PUBLIC_URL + '/user_logos/';
  const landing_logo = getLandingPageLogo();
  const background_image = getLandingBackground();
  const background_image_path = user_logos_path + background_image.file_name + background_image.file_ext;
  let background_style = {
    backgroundImage: "url(" + background_image_path + ")",
  };
  return (
    <React.Fragment>
      <div className="welcome-page">
        <div className="welcome-background" style={background_style}></div>
        <div className="welcome-content">
          <section className="mx-auto welcome-header">
            <div className="header-logo">
              <a
                href={landing_logo.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={
                    user_logos_path +
                    landing_logo.file_name +
                    landing_logo.file_ext
                  }
                  className="header_logo_img"
                  alt={landing_logo.alt}
                  width={landing_logo.width}
                  height={landing_logo.height}
                />
              </a>
            </div>
            <div className="my-3 ">
              <h3 className="mb-4 text-center page_header">
                Welcome to Quantum Pathway Program Login
              </h3>
            </div>

            <LoginButton />
          </section>
          <section className="mx-auto resource-status-section">
            <ResourceStatusTable />
          </section>
        </div>
        <div className="footer_container">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default WelcomeRoot;