import React from "react";
import PropTypes from "prop-types";
import Button from "../controls/Button";

const PromoBanner = ({
  promoImage,
  promoCaption,
  promoHeadline,
  promoDescription,
  promoButtonText,
}) => {
  return (
    <section className="promo-banner">
      <div className="promo-image">
        <img
          src={promoImage}
          alt="Sliik & Co. curated elegance"
          className="promo-img"
        />
      </div>

      <div className="promo-content">
        <div className="promo-inner">
          <p className="promo-caption">{promoCaption}</p>
          <h1 className="promo-headline">
            {promoHeadline}
            <br />
            styling session • with every purchase
          </h1>
          <p className="promo-description">{promoDescription}</p>
          <Button
            text={promoButtonText}
            onClick={() => {}}
            variant="primary"
            className="promo-button"
          />
        </div>
      </div>
    </section>
  );
};

PromoBanner.propTypes = {
  promoImage: PropTypes.string,
  promoCaption: PropTypes.string,
};

export default PromoBanner;