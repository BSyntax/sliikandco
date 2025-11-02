import { Routes, Route } from "react-router-dom";
import Nav from "../components/navigation/Nav";
import Hero from "../components/hero/Hero";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import Wishlist from "../pages/Whishlist";
import NotFound from "../pages/NotFound";
import "../scrollbar.css";

export default function AppRouter() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
