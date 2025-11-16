import React from "react";
import Lookbook1 from "../../assets/images/lookup-gallery-1.webp";
import Lookbook2 from "../../assets/images/lookup-gallery-2.webp";
import Lookbook3 from "../../assets/images/lookup-gallery-3.webp";
import Lookbook4 from "../../assets/images/lookup-gallery-4.webp";
import Lookbook5 from "../../assets/images/lookup-gallery-5.webp";
import Lookbook6 from "../../assets/images/lookup-gallery-6.webp";

export default function LookbookGallery() {
  return (
    <section className="lookbook-gallery home-page">
      <div className="lookbook-grid">
        <div className="lookbook-item">
          <img src={Lookbook1} alt="Lookbook image 1" />
        </div>
        <div className="lookbook-item">
          <img src={Lookbook2} alt="Lookbook image 2" />
        </div>
        <div className="lookbook-item">
          <img src={Lookbook3} alt="Lookbook image 3" />
        </div>
        <div className="lookbook-item">
          <img src={Lookbook4} alt="Lookbook image 4" />
        </div>
        <div className="lookbook-item">
          <img src={Lookbook5} alt="Lookbook image 5" />
        </div>
        <div className="lookbook-item">
          <img src={Lookbook6} alt="Lookbook image 6" />
        </div>
      </div>
    </section>
  );
}
