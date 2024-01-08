import React from 'react';
import { IoMdCreate, IoIosArrowBack } from 'react-icons/io'; // Importation des icônes pour le design
import './edition.css'; // Importation du fichier CSS pour le style du composant

// Définition du composant UserCard qui prend en paramètres 'user' et 'onEdit'
function Edition({ user, onEdit }) {
  return (
    // Structure principale de la carte utilisateur
    <div className="user-card">
      {/* // En-tête de la carte utilisateur */}
      <div className="user-header">
        <IoIosArrowBack className="back-icon" /> // Icône de retour
        <h2 className="user-title">Entreprise</h2> // Titre de la carte
      </div>
      {/* // Contenu principal de la carte utilisateur */}
      <div className="user-content">
        {/* // Champs d'informations de l'utilisateur */}
        <div className="user-field">
          <span className="field-name">Entreprise:</span> // Nom du champ
          <span className="field-value">{user.companyName}</span> // Valeur du champ (nom de l'entreprise)
        </div>
        {/* // Autres champs d'informations avec la même structure */}
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
        {/* // Champ spécial pour indiquer si l'utilisateur est administrateur */}
        <div className="user-field admin-field">
          <label htmlFor="admin-checkbox">Admin</label>
          <input type="checkbox" id="admin-checkbox" checked={user.isAdmin} readOnly />
        </div>
        {/* // Boutons d'actions (modifier, supprimer, terminer) */}
        <div className="user-actions">
          <button className="edit-button" onClick={onEdit}><IoMdCreate /></button> // Bouton modifier
          <button className="delete-button">Supprimer</button> // Bouton supprimer
          <button className="submit-button">Terminer</button> // Bouton terminer
        </div>
      </div>
    </div>
  );
}

export default Edition 
// Exportation du composant pour utilisation ailleurs dans l'application
