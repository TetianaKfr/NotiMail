import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../pages/Notifier/notifier.css";
import { NavLink } from "react-router-dom";

// Composant Modal
const Modal = ({ show, setShowModal, handleEnvoi }) => {
  // État local
  const [data, setData] = useState([]); // Données récupérées de l'API
  const [selectedCompany, setSelectedCompany] = useState(""); // Entreprise sélectionnée dans la liste déroulante
  const [companies, setCompanies] = useState([
    // Liste des entreprises
    "Microsoft",
    "Microsoft",
    "Google",
    "Meta",
    "Amazon",
    "Tesla Motors",
    "Space X",
    "Microsoft",
    "Google",
    "Meta",
    "Amazon",
    "Tesla Motors",
    "Space X",
  ]);
  const [isLoading, setIsLoading] = useState(false); // État du chargement
  const handleClose = () => {
    setShowModal(false);
  };

  // Effet secondaire pour récupérer des données de l'API lors du montage
  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  // Fonction de gestion du changement d'entreprise dans la liste déroulante
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };
  // Rendu JSX du composant Modal
  return (
    <div>
      <section className="modal-main">
        <div className="cadre">
          <h2>Vous vous apprêtez à notifier :</h2>
          <select
            className="selected"
            value={selectedCompany}
            onChange={handleCompanyChange}
            multiple
          >
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
          <div className="container">
            <button className="close" onClick={handleClose}>
              Annuler
            </button>
            <button className="envoi" onClick={handleEnvoi}>
              Envoyer
            </button>
          </div>
        </div>
      </section>
      <NavLink to="/admin" onClick={handleClose}>
        Close
      </NavLink>
    </div>
  );
};
// Composant MyComponent
const MyComponent = ({ show }) => {
  // Rendu JSX du composant MyComponent
  return (
    <div>
      {show ? <p>Le composant est affiché</p> : <p>Le composant est masqué</p>}
    </div>
  );
};
// Propriétés PropTypes pour le composant Modal
Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleEnvoi: PropTypes.func.isRequired,
};
// Export du composant Modal
export default Modal;
