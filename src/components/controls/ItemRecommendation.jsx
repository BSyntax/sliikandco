import React from "react";

export default function ItemRecommendation({ recommend, setRecommend }) {
  return (
    <div className="form-group-item form-recommendation">
      <label>Would you recommend this product?</label>
      <div className="recommend-option-list">
        <label>
          <input
            type="radio"
            name="recommend"
            value="yes"
            checked={recommend === "yes"}
            onChange={(e) => setRecommend(e.target.value)}
          />
          <span>Yes</span>
        </label>

        <label>
          <input
            type="radio"
            name="recommend"
            value="no"
            checked={recommend === "no"}
            onChange={(e) => setRecommend(e.target.value)}
          />
          <span>No</span>
        </label>
      </div>
    </div>
  );
}
