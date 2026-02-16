
import React from "react";

function ContactList({ contacts, selected, onSelect }) {
  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <li
          key={contact.id}
          onClick={() => onSelect(contact)}
          className={`contact-item ${selected && selected.id === contact.id ? "selected" : ""}`}
        >
          <div className="avatar">
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <div className="contact-info">
            <h3>{contact.name}</h3>
            <p>{contact.email}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;