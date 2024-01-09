import { IoMdCreate} from "react-icons/io"; // Icônes pour le design
import { TiArrowLeftThick } from "react-icons/ti";
import "./edition.css"; // Assurez-vous de créer un fichier CSS correspondant

function Edition({ user, onEdit }) {
  return (
    <div className="user-card">
      <div className="user-header">
        <TiArrowLeftThick className="back-icon" />
        <h2 className="user-title">Entreprise</h2>
      </div>
      <div className="user-content">
        <div className="user-field">
          <span className="field-name">Entreprise:</span>
          <span className="field-value">{user.companyName}</span>
        </div>
        <div className="user-field">
          <span className="field-name">Contact:</span>
          <input type="text" name="Contact" />
          <span className="field-value">{user.contactName}</span>
        </div>
        <div className="user-field">
          <span className="field-name">Téléphone:</span>
          <input type="tel" name="telephone" />
          <span className="field-value">{user.phone}</span>
        </div>
        <div className="user-field">
          <span className="field-name">Email:</span>
          <input type="email" />
          <span className="field-value">{user.email}</span>
        </div>
        <div className="user-field">
          <span className="field-name">Identifiant:</span>
          <input type="text" name="Identifiant" />
          <span className="field-value">{user.userCode}</span>
        </div>
        <div className="user-field admin-field">
          <label htmlFor="admin-checkbox">Admin</label>
          <input
            type="checkbox"
            id="admin-checkbox"
            checked={user.isAdmin}
            readOnly
          />
        </div>
        <div className="user-actions">
          <button className="edit-button" onClick={onEdit}>
            <IoMdCreate />
          </button>
          <button className="delete-button">Supprimer</button>
          <button className="submit-button">Terminer</button>
        </div>
      </div>
    </div>
  );
}

export default Edition;
