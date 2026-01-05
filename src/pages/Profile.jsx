import PropTypes from "prop-types";
import React, { useState } from "react";
import Breadcrumbs from "../components/wishitem/BreadCrumb";
import Sidebar from "../components/profile/sidebar.jsx";
import ProfileMain from "../components/profile/ProfileMain.jsx";
import ProfileInfo from "../components/profile/ProfileInfo.jsx";
import OrderHistory from "../components/profile/OrderHistory.jsx";
import Wishlist from "../components/profile/Wishlist.jsx";
import Addresses from "../components/profile/Addresses.jsx";
import Button from "../components/controls/Button.jsx";

export default function Profile({}) {
  const [mainTitle, setMainTitle] = useState("Personal Information");
  const renderMainContent = () => {
    switch (mainTitle) {
      case "Personal Information":
        return <ProfileInfo />;
      case "Order History":
        return <OrderHistory />;
      case "Wishlist":
        return <Wishlist />;
      case "Addresses":
        return <Addresses />;
      default:
        return <ProfileInfo />;
    }
  };
  return (
    <div className="profile">
      <Breadcrumbs from={{ label: "Home", path: "/" }} current="Profile" />
      <div className="header-container container">
        <h2 className="profile-header">My Account</h2>
        <Button
          text="Logout"
          variant="secondary"
          className="logout-button"
          type="button"
        />
      </div>
      <div className="profile-content container">
        <div className="profile-sidebar">
          <Sidebar setMainTitle={setMainTitle} />
        </div>
        <div className="profile-main-content">
          <ProfileMain title={mainTitle}>{renderMainContent()}</ProfileMain>
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {};
Profile.defaultProps = {};
