import React from "react";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import AvatarPlaceholder from "../../assets/images/avatar-placeholder.webp";

export default function ReviewCard({ reviewInfo }) {
  const { reviewer, rating, date, comment, recommend, images } = reviewInfo;

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <RiStarFill key={i} className="star-filled" />
      ) : (
        <RiStarLine key={i} className="star-empty" />
      )
    );
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <div className="avatar">
            <img
              src={images.length > 0 ? images[0] : AvatarPlaceholder}
              alt={reviewer}
            />
          </div>

          <div className="reviewer-details">
            <div className="reviewer-name">{reviewer}</div>
            <div className="verified-badge">Verified</div>
            <div className="rating-stars">{renderStars()}</div>
          </div>
        </div>

        <div className="review-date">{date}</div>
      </div>

      <div className="review-comment">
        <p>{comment}</p>
      </div>
    </div>
  );
}
