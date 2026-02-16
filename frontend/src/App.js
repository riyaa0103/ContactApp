import React, { useState, useEffect } from "react";
import api from "./api";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import ContactDetails from "./components/ContactDetails";
import "./styles/App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContacts = () => {
    setLoading(true);
    setError(null);
    api
      .get("/contacts")
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load contacts. Please try again.");
        setContacts([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.name &&
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.email &&
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.phone && contact.phone.includes(searchTerm))
  );

  const handleAdd = (data) => {
    setError(null);
    api
      .post("/contacts", data)
      .then(() => {
        fetchContacts();
        setShowForm(false);
      })
      .catch((err) => {
        setError("Failed to add contact. Please try again.");
      });
  };

  const handleUpdate = (data) => {
    setError(null);
    api
      .put(`/contacts/${selected.id}`, data)
      .then(() => {
        fetchContacts();
        setSelected(null);
        setShowForm(false);
      })
      .catch((err) => {
        setError("Failed to update contact. Please try again.");
      });
  };

  const handleDelete = (id) => {
    setError(null);
    if (window.confirm("Are you sure you want to delete this contact?")) {
      api
        .delete(`/contacts/${id}`)
        .then(() => {
          fetchContacts();
          setSelected(null);
        })
        .catch((err) => {
          setError("Failed to delete contact. Please try again.");
        });
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelected(null);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="header-content">
          <h1>
            <i className="icon contacts-icon"></i>
            Contacts
          </h1>
          <div className="header-actions">
            <div className="search-container">
              <i className="icon search-icon"></i>
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                >
                  ×
                </button>
              )}
            </div>
            <button
              className="btn-primary"
              onClick={() => {
                setShowForm(true);
                setSelected(null);
              }}
            >
              <i className="icon add-icon"></i>
              Add Contact
            </button>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="left-panel">
          <div className="panel-header">
            <h2>All Contacts ({filteredContacts.length})</h2>
          </div>
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading contacts...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <i className="icon error-icon"></i>
              <p>{error}</p>
              <button onClick={fetchContacts} className="btn-retry">
                Try Again
              </button>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="empty-state">
              {searchTerm ? (
                <>
                  <i className="icon search-icon"></i>
                  <h3>No matches found</h3>
                  <p>Try a different search term</p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="btn-secondary"
                  >
                    Clear Search
                  </button>
                </>
              ) : (
                <>
                  <i className="icon contacts-icon"></i>
                  <h3>No contacts yet</h3>
                  <p>Add your first contact to get started</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="btn-primary"
                  >
                    Add Contact
                  </button>
                </>
              )}
            </div>
          ) : (
            <ContactList
              contacts={filteredContacts}
              selected={selected}
              onSelect={(contact) => {
                setSelected(contact);
                setShowForm(false);
              }}
            />
          )}
        </div>

        <div className="right-panel">
          {showForm ? (
            <div className="form-container">
              <div className="panel-header">
                <h2>{selected ? "Edit Contact" : "Add New Contact"}</h2>
                <button onClick={handleCancel} className="btn-close">
                  ×
                </button>
              </div>
              <ContactForm
                onSubmit={selected ? handleUpdate : handleAdd}
                initialData={selected || undefined}
                submitLabel={selected ? "Update Contact" : "Add Contact"}
                onCancel={handleCancel}
              />
            </div>
          ) : selected ? (
            <ContactDetails
              contact={selected}
              onEdit={() => setShowForm(true)}
              onDelete={() => handleDelete(selected.id)}
              onClose={() => setSelected(null)}
            />
          ) : (
            <div className="welcome-state">
              <i className="icon welcome-icon"></i>
              <h2>Welcome to Contacts</h2>
              <p>Select a contact to view details or add a new one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;