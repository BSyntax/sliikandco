import React from "react";
import { orders } from "../../../data/orders";
import OrderItem from "./OrderItem";
import Button from "../controls/Button";
import { Link } from "react-router-dom";
import "./OrderHistory.css";

export default function OrderHistory() {
  return (
    <div className="order-history-container">
      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>You have no orders</h2>
          <p>
            You have not placed any orders yet. When you do, they will appear
            here.
          </p>
          <Link to="/shop">
            <Button text="Continue Shopping" />
          </Link>
        </div>
      ) : (
        <div className="order-list">
          <div className="order-list-header">
            <p className="header-order-id">Order ID</p>
            <p className="header-date">Date</p>
            <p className="header-status">Status</p>
            <p className="header-total">Total</p>
            <p className="header-actions"></p>
          </div>
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}