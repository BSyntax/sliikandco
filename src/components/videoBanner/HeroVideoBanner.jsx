import React from "react";
import Button from "../controls/Button";
import PropTypes from "prop-types";

export default function HeroVideoBanner({
  videoSrc,
  heading,
  subheading,
  buttonText,
  onButtonClick,
}) {
  return (
    <section className="hero-video-banner">
      <div className="video-container">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        />
        <div className="video-overlay"></div>
      </div>

      {(heading || subheading || buttonText) && (
        <div className="video-content">
          {heading && <h1 className="video-heading">{heading}</h1>}
          {subheading && <p className="video-subheading">{subheading}</p>}
          {buttonText && (
            <Button
              variant="primary"
              text={buttonText}
              onClick={onButtonClick}
              className="video-button "
            />
          )}
        </div>
      )}
    </section>
  );
}

HeroVideoBanner.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
};
