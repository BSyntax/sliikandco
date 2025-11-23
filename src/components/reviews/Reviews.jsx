import React, { useEffect, useState } from "react";
import Button from "../controls/Button";
import RatingBreakdown from "../../components/ratingBreakDown/RatingBreakdown";
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";

export default function Reviews({ product }) {
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    if (!product || !product.reviews) return;

    const total = product.reviews.length;
    const sumRatings = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    setAverageRating(total ? sumRatings / total : 0);

    const counts = [0, 0, 0, 0, 0];
    product.reviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++;
    });
    setRatingCounts(counts.reverse());
  }, [product]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<RiStarFill key={i} color="#101419" size={16} />);
      } else if (i - rating <= 0.5) {
        stars.push(<RiStarHalfFill key={i} color="#101419" size={16} />);
      } else {
        stars.push(<RiStarLine key={i} color="#101419" size={16} />);
      }
    }
    return stars;
  };

  return (
    <section className="reviews container">
      <div className="reviews-header">
        <h2>Reviews</h2>
        <Button
          type="button"
          variant="primary"
          text="Write Review"
          onClick={() => {}}
        />
      </div>

      <div className="overall-rating">
        <div>
          {renderStars(averageRating)}
          <span>{averageRating.toFixed(1)} out of 5</span>
        </div>
        <div>Based on {product.reviews.length} reviews</div>
      </div>

      <RatingBreakdown counts={ratingCounts} />
    </section>
  );
}
