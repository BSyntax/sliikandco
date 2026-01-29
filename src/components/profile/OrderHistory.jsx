import React, { useState, useEffect } from "react";
import OrderItem from "./OrderItem";
import Button from "../controls/Button";
import { Link } from "react-router-dom";
import DateFilter from "../filter/DateFilter";
import "./OrderHistory.css";
import api from "../../utils/axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function OrderHistory() {
  const [activeTab, setActiveTab] = useState("Orders");
  const [selectedDateFilter, setSelectedDateFilter] = useState("All Time");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/myorders");
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filterOrders = () => {
    let filtered = [...orders];

    // Filter by Tab
    if (activeTab === "Not Yet Shipped") {
      filtered = filtered.filter(
        (order) => !order.isDelivered && order.status !== "Cancelled",
      );
    } else if (activeTab === "Cancelled Orders") {
      filtered = filtered.filter((order) => order.status === "Cancelled");
    }

    // Filter by Date
    const now = new Date();
    filtered = filtered.filter((order) => {
      // Order date might be 'createdAt' from MongoDB
      const orderDate = new Date(order.createdAt || order.date);
      const diffTime = Math.abs(now - orderDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      switch (selectedDateFilter) {
        case "Past 7 Days":
          return diffDays <= 7;
        case "Past 30 Days":
          return diffDays <= 30;
        case "Past 3 Months":
          return diffDays <= 90;
        case "Past 6 Months":
          return diffDays <= 180;
        case "Past Year":
          return diffDays <= 365;
        case "2025":
          return orderDate.getFullYear() === 2025;
        case "2024":
          return orderDate.getFullYear() === 2024;
        case "2023":
          return orderDate.getFullYear() === 2023;
        case "Older":
          return orderDate.getFullYear() < 2023;
        case "All Time":
        default:
          return true;
      }
    });

    return filtered;
  };

  const filteredOrders = filterOrders();

  return (
    <div className="order-history-container">
      <div className="order-history-layout">
        <div className="order-history-main">
          <div className="order-filters">
            <div className="filter-tabs">
              <button
                className={`filter-tab ${
                  activeTab === "Orders" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Orders")}
              >
                Orders
              </button>
              <button
                className={`filter-tab ${
                  activeTab === "Not Yet Shipped" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Not Yet Shipped")}
              >
                Not Yet Shipped
              </button>
              <button
                className={`filter-tab ${
                  activeTab === "Cancelled Orders" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Cancelled Orders")}
              >
                Cancelled Orders
              </button>
            </div>
            <DateFilter
              itemCount={filteredOrders.length}
              initialText={`${filteredOrders.length} orders`}
              setSelectedDateFilter={setSelectedDateFilter}
            />
          </div>

          <div className="order-list">
            <div className="orders-summary-bar">
              {filteredOrders.length} orders placed in {selectedDateFilter}
            </div>

            {filteredOrders.length === 0 ? (
              <div className="no-orders">
                <h2>No orders found</h2>
                <p>We couldn't find any orders matching your filters.</p>
                <Link to="/shop">
                  <Button text="Continue Shopping" variant="primary" />
                </Link>
              </div>
            ) : (
              filteredOrders.map((order, index) => (
                <OrderItem key={order.id || order._id || index} order={order} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
