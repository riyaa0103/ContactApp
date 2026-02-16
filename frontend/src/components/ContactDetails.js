import React, { useState } from "react";

function ContactDetails({ contact, onEdit, onDelete, onClose }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleConfirmDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="contact-details">
      <div className="panel-header">
        <h2>Contact Details</h2>
        <button onClick={onClose} className="btn-close">
          ×
        </button>
      </div>

      <div className="detail-content">
        <div className="detail-avatar">
          {contact.name.charAt(0).toUpperCase()}
        </div>

        <h1>{contact.name}</h1>

        <div className="detail-group">
          <label>Phone</label>
          <p>{contact.phone}</p>
        </div>

        <div className="detail-group">
          <label>Email</label>
          <p>{contact.email}</p>
        </div>

        <div className="detail-actions">
          <button onClick={onEdit} className="btn-primary">
            <i className="icon edit-icon"></i>
            Edit
          </button>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="btn-danger"
            >
              <i className="icon delete-icon"></i>
              Delete
            </button>
          ) : (
            <div className="delete-confirmation">
              <span>Are you sure?</span>
              <button
                onClick={handleConfirmDelete}
                className="btn-danger"
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                className="btn-secondary"
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
