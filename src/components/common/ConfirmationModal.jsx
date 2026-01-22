import React from "react";
import "./ConfirmationModal.css";
import Button from "../controls/Button";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <Button
            text="Cancel"
            onClick={onClose}
            variant="secondary"
            className="cancel-btn"
          />
          <Button
            text="Delete"
            onClick={onConfirm}
            variant="danger"
            className="delete-btn"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
