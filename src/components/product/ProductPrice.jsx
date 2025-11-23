import React from "react";

export default function ProductPrice({ product, finalPrice }) {
  return (
    <div className="product-price">
      {product.isOnSale ? (
        <div className="price-on-sale">
          <span className="original-price">
            {`R${product.price.toFixed(2)}`}
          </span>
          -<span>{`R${finalPrice.toFixed(2)}`}</span>
        </div>
      ) : (
        `R${finalPrice.toFixed(2)}`
      )}
    </div>
  );
}
