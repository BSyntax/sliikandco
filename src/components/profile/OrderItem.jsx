import React, { useState } from "react";
import PropTypes from "prop-types";
import "./OrderItem.css";
import Button from "../controls/Button";
import { Link } from "react-router-dom";

const OrderItem = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = new Date(order.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="order-item">
      <div className="order-summary" onClick={() => setIsOpen(!isOpen)}>
        <p className="order-id">{order.id}</p>
        <p className="order-date">{formattedDate}</p>
        <p className={`order-status ${order.status.toLowerCase()}`}>
          {order.status}
        </p>
        <p className="order-total">R{order.total.toFixed(2)}</p>
        <button className="order-toggle">{isOpen ? "Hide" : "View"}</button>
      </div>
      {isOpen && (
        <div className="order-details">
          {order.items.map((item) => (
            <div key={item.id} className="order-product">
              <div className="product-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="product-info">
                <Link to={`/product/${item.id}`} className="product-name">
                  {item.name}
                </Link>
                <p className="product-quantity">Quantity: {item.quantity}</p>
                <p className="product-price">R{item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="order-actions">
            <Button text="Reorder" variant="primary" />
            <Button text="Leave a Review" variant="secondary" />
          </div>
        </div>
      )}
    </div>
  );
};

OrderItem.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default OrderItem;
