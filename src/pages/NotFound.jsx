import React, { useEffect, useState } from "react";
import image from "../assets/images/404.webp";

export default function NotFound() {
  return (
    <div className="sliik-404">
      <div className="sliik-404-content">
        <h1>Oops! Page Not Found</h1>
        <p>
          Looks like the page you’re looking for has strayed from the runway.
        </p>
      </div>
      <div className="sliik-404-image">
        <img src={image} alt="Page Not Found" />
      </div>
    </div>
  );
}
