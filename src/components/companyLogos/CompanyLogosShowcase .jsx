import React from "react";

import Logo1 from "../../assets/logos/logo-1.webp";
import Logo2 from "../../assets/logos/logo-2.webp";
import Logo3 from "../../assets/logos/logo-3.webp";
import Logo4 from "../../assets/logos/logo-4.webp";
import Logo5 from "../../assets/logos/logo-5.webp";
import Logo6 from "../../assets/logos/logo-6.webp";

const logos = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6];

export default function CompanyLogosShowcase() {
  return (
    <section className="logos-section">
      <div className="logos-wrapper">
        <div className="logos-track">
          {logos.concat(logos).map((logo, idx) => (
            <div key={idx} className="logo-item">
              <img
                src={logo}
                alt={`Brand logo ${(idx % 6) + 1}`}
                className="logo-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
