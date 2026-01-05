import React from "react";
import "./UploadPhoto.css";
import { RiCloseFill } from "react-icons/ri";

export default function UploadPhoto({
  handleClosePreview,
  handleFileChange,
  photos,
}) {
  return (
    <div className="form-group-item form-photo-upload">
      <label>Add Photos (optional)</label>

      <div
        className={`photo-file-chooser ${
          photos.length > 0 ? "photo-chooser-active" : ""
        }`}
      >
        <input
          type="file"
          id="photo-upload"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <label htmlFor="photo-upload" className="upload-button-label">
          Choose file
        </label>
        <span className="chosen-file-display">{`${
          photos.length < 1 ? "No file chosen" : ""
        }`}</span>
      </div>

      {photos.length > 0 && (
        <div className="uploaded-photo-preview">
          <span className="preview-delete-button">
            <RiCloseFill onClick={handleClosePreview} size={16} />
          </span>
          {photos.map((file, i) => (
            <div className="uploaded-img-container" key={i}>
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="thumbnail-image-preview"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
