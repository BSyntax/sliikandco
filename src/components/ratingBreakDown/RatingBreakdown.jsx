import React from "react";
import { RiStarFill, RiStarLine } from "react-icons/ri";

export default function RatingBreakdown({ counts }) {
  const total = counts.reduce((sum, c) => sum + c, 0);

  return (
    <div className="rating-breakdown">
      {counts.map((count, index) => {
        const stars = 5 - index; 
        const percentage = total ? (count / total) * 100 : 0;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <div style={{ display: "flex", width: "6rem" }}>
              {Array.from({ length: 5 }, (_, i) =>
                i < stars ? (
                  <RiStarFill key={i} color="#101419" />
                ) : (
                  <RiStarLine key={i} color="#101419" />
                )
              )}
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "#f2f2f2",
                height: "10px",
                margin: "0 0.5rem",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${percentage}%`,
                  backgroundColor: "#101419",
                  height: "100%",
                }}
              />
            </div>

            <span style={{ width: "1rem", textAlign: "right" }}>{count}</span>
          </div>
        );
      })}
    </div>
  );
}
