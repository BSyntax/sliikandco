import React from "react";
import "./ProfileMain.css";

export default function ProfileMain({ title, children }) {
  return (
    <div className="profile-main">
      <h2 className="main-title">{title}</h2>
      {children}
    </div>
  );
}
