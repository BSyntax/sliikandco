import BreadCrumb from "../components/wishitem/BreadCrumb";
import React, { useState, useEffect } from "react";
import { RiStarLine, RiStarFill } from "react-icons/ri";
import Button from "../components/controls/Button";
import { useNavigate, useParams } from "react-router-dom";
import UploadPhoto from "../components/controls/UploadPhoto";
import ItemRecommendation from "../components/controls/ItemRecommendation";
import { useProducts } from "../context/ProductProvider";
import { toast } from "react-toastify";
import api from "../utils/axios";

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [fullName, setFullName] = useState("");
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState("");
  const [recommend, setRecommend] = useState("no");
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProductById, refreshProducts } = useProducts();

  useEffect(() => {
    const foundProduct = getProductById(id);
    setProduct(foundProduct);
  }, [id, getProductById]);

  const handleStarClick = (index) => setRating(index + 1);

  const renderStars = () =>
    Array.from({ length: 5 }, (_, i) => {
      const isFilled = hovered > i || rating > i;
      const Icon = isFilled ? RiStarFill : RiStarLine;
      return (
        <Icon
          key={i}
          className={isFilled ? "star-filled" : "star-empty"}
          size={24}
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => handleStarClick(i)}
        />
      );
    });

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length > 3) {
      alert("You can upload up to 3 photos.");
      return;
    }
    setPhotos(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;
    if (!rating || rating === 0) {
      toast.error("Please select a star rating", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    try {
      await api.post(`/products/${product.id}/reviews`, {
        rating,
        comment: review,
        recommend: recommend === "yes",
        name: fullName,
      });

      toast.success("Review submitted successfully!");
      if (refreshProducts) await refreshProducts();
      if (handleCancel) handleCancel();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to submit review.";
      toast.error(errorMessage);
      console.error("Review submission failed:", err);
    }
  };

  const handleClosePreview = () => {
    setPhotos([]);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <BreadCrumb from="Home" current="Review" />
      <section className="review-page-container container">
        <div className="review-page-header">
          <h2>Write a review</h2>
        </div>
        <form className="review-page-form" onSubmit={handleSubmit}>
          <div className="form-group-item form-rating-stars">
            <div className="rating-star-icons">{renderStars()}</div>
          </div>

          <div className="form-group-item">
            <label className="input-required-label">Write your review *</label>
            <textarea
              placeholder="Share your thoughts about this product..."
              rows="6"
              className="form-text-input"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </div>

          <ItemRecommendation
            recommend={recommend}
            setRecommend={setRecommend}
          />
          <UploadPhoto
            handleClosePreview={handleClosePreview}
            handleFileChange={handleFileChange}
            photos={photos}
          />

          <div className="form-group-item">
            <label className="input-required-label">Your Full Name *</label>
            <input
              type="text"
              className="form-text-input"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-action-buttons">
            <Button
              text="Submit Review"
              variant="primary"
              type="submit"
              disabled={!product}
            />
            <Button
              text="Cancel"
              variant="secondary"
              type="button"
              onClick={handleCancel}
            />
          </div>
        </form>
      </section>
    </>
  );
}
