import React from "react";

export default function WhyShopWithUs({ whyChooseUs }) {
  return (
    <section className="why-shop">
      <h2 className="why-shop-header container"></h2>
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
