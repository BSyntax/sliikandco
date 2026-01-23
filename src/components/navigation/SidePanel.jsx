import PropTypes from "prop-types";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

export default function SidePanel({ open, onClose, children }) {
  useLockBodyScroll(open);
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
