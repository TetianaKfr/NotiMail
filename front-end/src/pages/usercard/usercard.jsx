import React from 'react';
import { IoMdCreate, IoIosArrowBack } from 'react-icons/io'; // Icônes pour le design
import './usercard.css'; // Assurez-vous de créer un fichier CSS correspondant

function UserCard({ user, onEdit }) {
  return (
    <div className="user-card">
      <div className="user-header">
        <IoIosArrowBack className="back-icon" />
        <h2 className="user-title">Entreprise</h2>
      </div>
      <div className="user-content">
        <div className="user-field">
          <span className="field-name">Entreprise:</span>
          <span className="field-value">{user.companyName}</span>
        </div>
        <div className="user-field">
          <span className="field-name">Contact:</span>
          <span className="field-value">{user.contactName}</span>
        </div>
        <div className="user-field">
          <span className="field-name">Téléphone:</span>
          <span className="field-value">{user.phone}</span>
        </div>
        <div className="user-field">
          <span className="field-name">Email:</span>
          <span className="field-value">{user.email}</span>
        </div>
        <div className="user-field">
          <span className="field-name">Identifiant:</span>
          <span className="field-value">{user.userCode}</span>
        </div>
        <div className="user-field admin-field">
          <label htmlFor="admin-checkbox">Admin</label>
          <input type="checkbox" id="admin-checkbox" checked={user.isAdmin} readOnly />
        </div>
        <div className="user-actions">
          <button className="edit-button" onClick={onEdit}><IoMdCreate /></button>
          <button className="delete-button">Supprimer</button>
          <button className="submit-button">Terminer</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
