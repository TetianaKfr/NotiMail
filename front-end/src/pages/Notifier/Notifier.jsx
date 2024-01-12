import React, { useState,  useEffect } from 'react';
import PropTypes from 'prop-types';
import "../../pages/Notifier/notifier.css";


const Modal = ({ show, handleClose, handleEnvoi }) => {
  const [data, setData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companies, setCompanies] = useState([
    'Microsoft',
    'Google',
    'Meta',
    'Amazon',
    'Tesla Motors',
    'Space X',
    "Microsoft",
    "Google",
    "Meta",
    "Amazon",
    "Tesla Motors",
    "Space X",
  ]);
  
  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  return (
    <div className={show ? 'modal display-block' : 'modal display-none'}>
      <section className="modal-main">
        <h2>Vous vous apprêtez à notifier :</h2>
        <select value={selectedCompany} onChange={handleCompanyChange}>
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
        <button onClick={handleClose}>Annuler</button>
        <button onClick={() => alert(`Vous avez sélectionné ${selectedCompany}`)}>
          Envoyer
        </button>
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
    </div>
  );
};
const MyComponent = ({ show }) => {
  return (
    <div>
      {show ? <p>Le composant est affiché</p> : <p>Le composant est masqué</p>}
    </div>
  );
};


  Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleEnvoi: PropTypes.func.isRequired,
  };

export default Modal;