import React from "react";
import { useSelector } from "react-redux";
import BlankCard from "@components/UI/Card/BlankCard";

function NotFound() {
  const fs = useSelector((state) => state.accessibilities.font_size);
  const errorTitle_fs = +fs * 2.5;
  const errorMessage_fs = +fs * 1.1;

  return (
    <div className="fluid-container flex-grow-1">
      <div className="row h-100">
        <BlankCard>
          <div id="error-page" className="text-center">
            <h1 style={{ fontSize: errorTitle_fs }}>Page Not Found</h1>
            <p style={{ fontSize: errorMessage_fs }}>
              The request URL is not found.
            </p>
          </div>
        </BlankCard>
      </div>
    </div>
  );
}

export default NotFound;
