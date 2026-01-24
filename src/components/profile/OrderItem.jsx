import React, { useState } from "react";
import PropTypes from "prop-types";
import "./OrderItem.css";
import Button from "../controls/Button";
import { Link } from "react-router-dom";
import {
  IoEllipsisHorizontal,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";

const OrderItem = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const orderDate = order.createdAt || order.date;
  const formattedDate = new Date(orderDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const returnDate = new Date(orderDate);
  returnDate.setDate(returnDate.getDate() + 30);
  const formattedReturnDate = returnDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`order-card ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="order-card-header">
        <div className="header-column">
          <span className="label">Order placed</span>
          <span className="value">{formattedDate}</span>
        </div>
        <div className="header-column">
          <span className="label">Total</span>
          <span className="value">
            R{(order.totalPrice ?? order.total ?? 0).toFixed(2)}
          </span>
        </div>
        <div className="header-column">
          <span className="label">Ship to</span>
          <span className="value link-text">
            {order.shippingAddress?.name || "Customer"}
          </span>
        </div>
        <div className="header-column right-align">
          <span className="label">Order {order.id}</span>
          <div className="header-links">
            <Link to={`/order/${order.id}`} className="link-text">
              View order details
            </Link>
            <span className="divider">|</span>
            <Link to="#" className="link-text">
              View invoice
            </Link>
          </div>
        </div>
        <button className="toggle-button" onClick={toggleExpand}>
          {isExpanded ? <IoChevronUp /> : <IoChevronDown />}
        </button>
      </div>

      {isExpanded && (
        <div className="order-card-body">
          <h3 className="delivery-status">
            {order.status} {formattedDate}
          </h3>

          <div className="order-products-list">
            {(order.orderItems || []).map((item, index) => (
              <div
                key={item.id || item._id || index}
                className="order-product-item"
              >
                <div className="product-image-container">
                  <div className="product-image-bg">
                    <img src={item.image} alt={item.name} />
                  </div>
                </div>

                <div className="product-details">
                  <Link to={`/product/${item.id}`} className="product-name">
                    {item.name}
                  </Link>
                  <p className="return-window">
                    Return or replace items: Eligible through{" "}
                    {formattedReturnDate}
                  </p>
                  <div className="product-actions-mobile">
                    <Button text="Buy it again" variant="primary" />
                  </div>
                </div>

                <div className="product-actions">
                  <Button text="Buy it again" variant="primary" />
                  <Button text="View your item" variant="secondary" />
                  <Button text="Track package" variant="secondary" />
                  <button className="icon-button">
                    <IoEllipsisHorizontal />
                  </button>
                </div>
              </div>
            ))}
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
    orderItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        qty: PropTypes.number,
        quantity: PropTypes.number,
        image: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default OrderItem;
