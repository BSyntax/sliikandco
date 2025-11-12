import { useEffect, useState, useRef } from "react";
import "../../index.css";
import { NavLink } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuUser, LuSearch, LuHeart } from "react-icons/lu";
import DropDownModel from "./DropDownModel";
import SearchModel from "../search/SearchModel";
import CartModel from "../cart/CartModel";
import { useCart } from "../../context/CartProvider";
import AnnouncementBar from "./AnnouncementBar";

export default function Nav() {
  const [dropdownType, setDropdownType] = useState(null);
  const [searchModel, setSearchModel] = useState("close");
  const [sticky, setSticky] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const cart = useCart();
  const cartCount = cart.cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleEnter = (type) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setDropdownType(type);
  };

  const handleLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownType(null);
    }, 150);
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  };

  const handleDropdownLeave = () => {
    setDropdownType(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchModel((prev) => (prev === "close" ? "open" : "close"));
  };

  const handleCartModel = (e) => {
    e.preventDefault();
    setCartModalOpen((prev) => !prev);
  };

  const handleSticky = () => {
    setSticky(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleSticky);
    return () => {
      window.removeEventListener("scroll", handleSticky);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <AnnouncementBar />
      <header className={sticky ? "sticky" : ""}>
        <nav className="nav-container container">
          <NavLink to="/" className="nav-logo">
            Sliik & Co.
          </NavLink>

          <div className="nav-links">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>

            <div
              className="nav-item-with-dropdown"
              onMouseEnter={() => handleEnter("shop")}
              onMouseLeave={handleLeave}
            >
              <NavLink
                to="/shop"
                className="nav-link"
                onClick={(e) => e.preventDefault()}
              >
                Shop
              </NavLink>

              {dropdownType === "shop" && (
                <div
                  className="menu-dropdown active"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <DropDownModel type="shop" />
                </div>
              )}
            </div>

            <div
              className="nav-item-with-dropdown"
              onMouseEnter={() => handleEnter("collection")}
              onMouseLeave={handleLeave}
            >
              <NavLink
                to="/collections"
                className="nav-link"
                onClick={(e) => e.preventDefault()}
              >
                Collections
              </NavLink>

              {dropdownType === "collection" && (
                <div
                  className="menu-dropdown active"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <DropDownModel type="collection" />
                </div>
              )}
            </div>

            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
          </div>

          <div className="nav-icons">
            <NavLink to="/search" onClick={handleSearch} className="nav-link">
              <LuSearch />
            </NavLink>
            <NavLink to="/login" className="nav-link">
              <LuUser />
            </NavLink>
            <NavLink to="/wishlist" className="nav-link">
              <LuHeart />
            </NavLink>
            <NavLink
              to="/cart"
              onClick={handleCartModel}
              className="nav-link cart-icon"
            >
              <HiOutlineShoppingBag />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </NavLink>
          </div>

          <CartModel
            cartModalOpen={cartModalOpen}
            setCartModalOpen={setCartModalOpen}
          />
        </nav>

        {searchModel === "open" && (
          <SearchModel setSearchModel={setSearchModel} />
        )}
      </header>
    </>
  );
}
