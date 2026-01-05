import React from "react";
import "./PerksBar.css";
import {
  LuTruck,
  LuPackage,
  LuRefreshCcw,
  LuArrowUpRight,
} from "react-icons/lu";

import { Link } from "react-router-dom";

const perks = [
  {
    icon: <LuTruck />,
    title: "Free Delivery",
    description:
      "Enjoy complimentary shipping on all qualifying orders we’ll bring style right to your door.",
    buttonText: "Shop & Ship Free",
    link: "#",
  },
  {
    icon: <LuPackage />,
    title: "Fast Dispatch",
    description:
      "Your order ships quickly and safely because waiting shouldn’t be part of your look.",
    buttonText: "Order Now",
    link: "#",
  },
  {
    icon: <LuRefreshCcw />,
    title: "Hassle-Free Returns",
    description:
      "Changed your mind? Return items easily within 30 days no stress, no extra cost.",
    buttonText: "Return Policy",
    link: "#",
  },
];

export default function PerksBar() {
  return (
    <div className="perks-bar">
      <div className="container">
        {perks.map((perk, index) => (
          <div key={index} className="perk-item">
            <div className="perk-icon">{perk.icon}</div>
            <div className="perk-content">
              <h4 className="perk-title">{perk.title}</h4>
              <p className="perk-description">{perk.description}</p>
              <Link to={perk.link} className="perk-button">
                {perk.buttonText} <LuArrowUpRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
