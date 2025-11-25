import React from "react";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import AvatarPlaceholder from "../../assets/images/avatar-placeholder.webp";

export default function ReviewCard({ reviewInfo }) {
  const { reviewer, rating, date, comment, recommend, images = [] } = reviewInfo;

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <RiStarFill key={i} className="star-filled" color="#101419" size={14} />
      ) : (
        <RiStarLine key={i} className="star-empty" color="#101419" size={14} />
      )
    );
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <div className="rating-stars">{renderStars()}</div>
          <div className="reviewer-details">
            <div className={`avatar${images?.length > 0 ? " has-img" : ""}`}>
              <img
                src={images?.length > 0 ? images[0] : AvatarPlaceholder}
                alt={reviewer}
              />
            </div>
            <div className="reviewer-name">{reviewer}</div>
            <div className="verified-badge">Verified</div>
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
