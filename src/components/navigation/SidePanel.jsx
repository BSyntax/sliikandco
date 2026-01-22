import PropTypes from "prop-types";
import { RiCloseFill } from "react-icons/ri";

export default function SidePanel({ open, onClose, children }) {
  return (
    <>
      <div className={`mobile-menu ${open ? "open" : ""}`}>{children}</div>

      <div className="mobile-menu-overlay" onClick={onClose} />
    </>
  );
}

SidePanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
