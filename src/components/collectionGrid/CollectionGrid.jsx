import React from "react";
import { NavLink } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";

import CollectionImage1 from "../../assets/images/collection-image-1.webp";
import CollectionImage2 from "../../assets/images/collection-image-2.webp";
import CollectionImage3 from "../../assets/images/collection-image-3.webp";
import CollectionImage4 from "../../assets/images/collection-image-4.webp";


export default function CollectionGrid() {
  const collections = [
    {
      title: "Sale 35% Off",
      button: "Shop Sale",
      image: CollectionImage1,
      link: "/sale",
    },
    {
      title: "Best Sellers",
      button: "Shop Now",
      image: CollectionImage2,
      link: "/best-sellers",
    },
    {
      title: "New Arrivals",
      button: "Explore",
      image: CollectionImage3,
      link: "/new-arrivals",
    },
    {
      title: "Gift Guide",
      button: "Shop Gifts",
      image: CollectionImage4,
      link: "/gift-guide",
    },
  ];

  return (
    <section className="collections-section">
      <div className="collections-wrapper">
        {collections.map((col, idx) => (
          <NavLink key={idx} to={col.link} className="collection-card-link">
            <div className="collection-card">
              <img
                src={col.image}
                alt={col.title}
                className="collection-image"
                loading="lazy"
              />
              <div className="collection-content">
                <h2 className="collection-title">{col.title}</h2>
                <span className="collection-button">
                  {col.button} <LuArrowUpRight />
                </span>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
}
