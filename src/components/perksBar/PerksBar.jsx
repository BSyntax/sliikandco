import React from "react";
import { LuTruck, LuPackage, LuRefreshCcw } from "react-icons/lu";

const perks = [
  {
    icon: <LuTruck />,
    title: "Free Delivery",
    description:
      "Enjoy complimentary shipping on all qualifying orders we’ll bring style right to your door.",
  },
  {
    icon: <LuPackage />,
    title: "Fast Dispatch",
    description:
      "Your order ships quickly and safely because waiting shouldn’t be part of your look.",
  },
  {
    icon: <LuRefreshCcw />,
    title: "Hassle-Free Returns",
    description:
      "Changed your mind? Return items easily within 30 days no stress, no extra cost.",
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
