import React, { useEffect, useState, useMemo } from "react";
import Button from "../controls/Button";
import RatingBreakdown from "../../components/ratingBreakDown/RatingBreakdown";
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";
import ReviewSort from "./ReviewSort";
import ReviewList from "./ReviewList";
import { useNavigate } from "react-router-dom";

export default function Reviews({ product }) {
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0]);
  const navigate = useNavigate();

  const [sortValue, setSortValue] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

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

  const sortedReviews = useMemo(() => {
    if (!product || !product.reviews) return [];

    let sorted = [...product.reviews];

    switch (sortValue) {
      case "recent":
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date),
        );
        break;
      case "oldest":
        sorted.sort(
          (a, b) =>
            new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date),
        );
        break;
      case "high-rated":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "low-rated":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case "with-photos":
        sorted = sorted.filter((r) => r.images && r.images.length > 0);
        break;
      default:
        break;
    }

    return sorted;
  }, [product, sortValue]);

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(
    indexOfFirstReview,
    indexOfLastReview,
  );
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);

  const handleShowReviewForm = () => {
    navigate(`/review/${product.id || product._id}`);
  };

  return (
    <>
      <section className="reviews container">
        <div className="reviews-header">
          <h2>Reviews</h2>
          <Button
            type="button"
            variant="primary"
            text="Write Review"
            onClick={handleShowReviewForm}
          />
        </div>

        <div className="overall-rating">
          <div>
            {renderStars(averageRating)}
            <span>{averageRating.toFixed(1)} out of 5</span>
          </div>
          <div>Based on {product.reviews?.length || 0} reviews</div>
        </div>

        <RatingBreakdown counts={ratingCounts} />
        <ReviewSort
          sortValue={sortValue}
          onSortChange={(val) => {
            setSortValue(val);
            setCurrentPage(1);
          }}
        />
        <ReviewList reviews={currentReviews} />

        {totalPages > 1 && (
          <div
            className="review-pagination"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "2rem",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                padding: "0.5rem 1rem",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                border: "1px solid #ddd",
                background: "none",
              }}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              style={{
                padding: "0.5rem 1rem",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                border: "1px solid #ddd",
                background: "none",
              }}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </>
  );
}
