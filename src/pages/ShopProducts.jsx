import React, { useState } from "react";
import BreadCrumb from "../components/wishitem/BreadCrumb";
import ProductGrid from "../components/productGrid/ProductGrid";
import FilterEdit from "../components/filter/FilterEdit";
import SideBar from "../components/sidebar/SideBar";
import Pagination from "../components/pagination/Pagination";
import { LuFacebook, LuInstagram, LuTwitter } from "react-icons/lu";
import { Link } from "react-router-dom";


export default function ShopProducts() {
  const [selectedSort, setSelectedSort] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  const handleFilterChange = (type, value) => {
    setSelectedFilter({ type, value });
    setCurrentPage(1); // Reset to first page on new filter
  };

  const handleCleartFilter = () => {
    setSelectedFilter(null);
    setCurrentPage(1); // Reset to first page on clear
  };

  return (
    <>
      <BreadCrumb current={"shop"} />
      <div className="shop-page-flex container">
        <SideBar
          onFilterChange={handleFilterChange}
          handleCleartFilter={handleCleartFilter}
          selectedFilter={selectedFilter}
        />
        <div className="shop-products">
          <FilterEdit itemCount={itemCount} setSelectedSort={setSelectedSort} />
          <ProductGrid
            selectedSort={selectedSort}
            selectedFilter={selectedFilter}
            onCountChange={setItemCount}
            pageType="shop"
            currentPage={currentPage}
            productsPerPage={productsPerPage}
          />
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={itemCount}
            paginate={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
      <div className="stay-connected container">
        <div className="stay-connected-content">
          <span className="stay-connected-caption">Follow Us</span>
          <Link to="/" className="stay-connected-logo">
            Sliik & Co.
          </Link>
          <p className="stay-connected-description">
            Stay connected with us on social media for the latest updates,
            exclusive offers, and style inspiration. Join our community and be
            the first to know about new arrivals and special events.
          </p>
        </div>
        <div className="stay-connected-icons">
          <span className="stay-connected-icon">
            <Link
              to="https://facebook.com/sliikandco"
              aria-label="Visit our Facebook page"
            >
              <LuFacebook />
            </Link>
          </span>
          <span className="stay-connected-icon">
            <Link
              to="https://twitter.com/sliikandco"
              aria-label="Visit our Twitter page"
            >
              <LuTwitter />
            </Link>
          </span>
          <span className="stay-connected-icon">
            <Link
              to="https://instagram.com/sliikandco"
              aria-label="Visit our Instagram page"
            >
              <LuInstagram />
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
