import React from "react";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews }) {
  return (
    <div className="review-list">
      {reviews &&
        reviews.map((review, index) => (
          <ReviewCard key={index} reviewInfo={review} />
        ))}
    </div>
  );
}
