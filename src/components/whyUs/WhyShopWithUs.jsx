import React from "react";
import "./WhyUs.css";

export default function WhyShopWithUs({ whyChooseUs }) {
  return (
    <section className="why-shop">
      <div className="why-shop-list">
        {whyChooseUs &&
          whyChooseUs.map((item, index) => (
            <div className="why-shop-card" key={index}>
              <div className="why-shop-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="why-us-content">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
