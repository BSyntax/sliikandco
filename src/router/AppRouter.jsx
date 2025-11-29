import { Routes, Route } from "react-router-dom";
import Nav from "../components/navigation/Nav";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import Wishlist from "../pages/Whishlist";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Search from "../pages/SearchPage";
import ProductDetails from "../pages/ProductDetails";
import ShopProducts from "../pages/ShopProducts";
import Footer from "../components/footer/Footer";
import TopButton from "../components/controls/TopButton";
import ReviewPage from "../pages/ReviewPage";
import ScrollToTop from "../components/controls/ScrollToTop";
import "../scrollbar.css";

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/shop" element={<ShopProducts />} />
        <Route path="/review/:id" element={<ReviewPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <TopButton />
      <Footer />
    </>
  );
}
