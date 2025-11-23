import React, { useState, useRef } from "react";

export default function ProductMedia({ imageToShow, product, onImageChange }) {
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [zoomX, setZoomX] = useState(0);
  const [zoomY, setZoomY] = useState(0);
  const imgContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (imgContainerRef.current) {
      const { left, top, width, height } =
        imgContainerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomX(x);
      setZoomY(y);
    }
  };

  return (
    <div className="grid-left">
      <div
        className="product-img"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setZoomEnabled(true)}
        onMouseLeave={() => setZoomEnabled(false)}
        ref={imgContainerRef}
      >
        <img
          src={imageToShow}
          alt={product?.name}
          loading="lazy"
          className="main-product-img"
          style={
            zoomEnabled
              ? {
                  transform: "scale(2)",
                  transformOrigin: `${zoomX * 100}% ${zoomY * 100}%`,
                }
              : {}
          }
        />
      </div>

      <div className="image-varaints">
        {product.gallery?.map((img, index) => (
          <div
            className="variant"
            key={index}
            onClick={() => onImageChange(img)}
          >
            <img src={img} alt={product.name + " variant"} />
          </div>
        ))}
      </div>
    </div>
  );
}
