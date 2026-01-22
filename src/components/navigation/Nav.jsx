import { useEffect, useState, useRef } from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuUser, LuSearch, LuHeart } from "react-icons/lu";
import { RiMenuFill } from "react-icons/ri";
import { RiMenu2Fill } from "react-icons/ri";

import DropDownModel from "./DropDownModel";
import SearchModel from "../search/SearchModel";
import CartModel from "../cart/CartModel";
import AnnouncementBar from "./AnnouncementBar";
import SidePanel from "./SidePanel";

import { useCart } from "../../context/CartProvider";
import { useWishlist } from "../../context/WishlistProvider";
import { useAuth } from "../../context/AuthProvider";

export default function Nav() {
  const [dropdownType, setDropdownType] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [searchModel, setSearchModel] = useState("close");
  const [sticky, setSticky] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownTimeoutRef = useRef(null);

  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useAuth();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileDropdown(null);
  };

  return (
    <>
      <AnnouncementBar />

      <header className={sticky ? "sticky" : ""}>
        <nav className="nav-container container">
          <button
            className="mobile-menu-toggle mobile-only"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <RiMenu2Fill size={20} />
          </button>

          <NavLink to="/" className="nav-logo">
            Sliik & Co.
          </NavLink>

          <div className="nav-links desktop-only">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>

            <div
              className="nav-item-with-dropdown"
              onMouseEnter={() => setDropdownType("shop")}
              onMouseLeave={() => setDropdownType(null)}
            >
              <NavLink
                to="/shop"
                className="nav-link"
                onClick={(e) => e.preventDefault()}
              >
                Shop
              </NavLink>
              {dropdownType === "shop" && (
                <div className="menu-dropdown active">
                  <DropDownModel type="shop" />
                </div>
              )}
            </div>

            <div
              className="nav-item-with-dropdown"
              onMouseEnter={() => setDropdownType("collection")}
              onMouseLeave={() => setDropdownType(null)}
            >
              <NavLink
                to="/collections"
                className="nav-link"
                onClick={(e) => e.preventDefault()}
              >
                Collections
              </NavLink>
              {dropdownType === "collection" && (
                <div className="menu-dropdown active">
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

          <div className="nav-icons desktop-only">
            <NavLink
              to="/search"
              onClick={() => setSearchModel("open")}
              className="nav-link"
            >
              <LuSearch />
            </NavLink>

            <NavLink to={user ? "/profile" : "/login"} className="nav-link">
              <LuUser />
            </NavLink>

            <NavLink to="/wishlist" className="nav-link wishlist-icon">
              <LuHeart />
              {wishlistCount > 0 && (
                <span className="wishlist-count">{wishlistCount}</span>
              )}
            </NavLink>

            <NavLink
              to="#"
              onClick={() => setCartModalOpen(true)}
              className="nav-link cart-icon"
            >
              <HiOutlineShoppingBag />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </NavLink>
          </div>

          <div className="nav-icons mobile-only">
            <NavLink
              to="/search"
              onClick={() => setSearchModel("open")}
              className="nav-link"
            >
              <LuSearch size={20} />
            </NavLink>

            <NavLink
              to="#"
              onClick={() => setCartModalOpen(true)}
              className="nav-link cart-icon"
            >
              <HiOutlineShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </NavLink>
          </div>
        </nav>

        <SidePanel open={isMobileMenuOpen} onClose={closeMobileMenu}>
          <div className="nav-links">
            <NavLink to="/" className="nav-link" onClick={closeMobileMenu}>
              Home
            </NavLink>

            <button
              className="nav-link"
              onClick={() =>
                setMobileDropdown(mobileDropdown === "shop" ? null : "shop")
              }
            >
              Shop
            </button>
            {mobileDropdown === "shop" && <DropDownModel type="shop" />}

            <button
              className="nav-link"
              onClick={() =>
                setMobileDropdown(
                  mobileDropdown === "collection" ? null : "collection"
                )
              }
            >
              Collections
            </button>
            {mobileDropdown === "collection" && (
              <DropDownModel type="collection" />
            )}

            <NavLink to="/about" className="nav-link" onClick={closeMobileMenu}>
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="nav-link"
              onClick={closeMobileMenu}
            >
              Contact
            </NavLink>
          </div>

          <div className="nav-icons">
            <NavLink
              to="/search"
              onClick={() => {
                setSearchModel("open");
                closeMobileMenu();
              }}
              className="nav-link"
            >
              <LuSearch />
            </NavLink>

            <NavLink to={user ? "/profile" : "/login"} className="nav-link">
              <LuUser />
            </NavLink>

            <NavLink to="/wishlist" className="nav-link wishlist-icon">
              <LuHeart />
              {wishlistCount > 0 && (
                <span className="wishlist-count">{wishlistCount}</span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              onClick={() => {
                setCartModalOpen(true);
                closeMobileMenu();
              }}
              className="nav-link cart-icon"
            >
              <HiOutlineShoppingBag />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </NavLink>
          </div>
        </SidePanel>

        {searchModel === "open" && (
          <SearchModel setSearchModel={setSearchModel} />
        )}

        <CartModel
          cartModalOpen={cartModalOpen}
          setCartModalOpen={setCartModalOpen}
        />
      </header>
    </>
  );
}
