import React from "react";
import PropTypes from "prop-types";
import Button from "../controls/Button";
import { useNavigate } from "react-router-dom";

const PromoBanner = ({
  promoImage,
  promoCaption,
  promoHeadline,
  promoDescription,
  promoButtonText,
}) => {
  const navigate = useNavigate();
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
            onClick={() => {
              navigate("/contact");
            }}
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
  promoHeadline: PropTypes.string,
  promoDescription: PropTypes.string,
  promoButtonText: PropTypes.string,
};

export default PromoBanner;
