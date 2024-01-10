import React, { useState } from 'react';
import PropTypes from 'prop-types';


const Modal = ({ show, handleClose }) => {
  const [companies, setCompanies] = useState([
    'Microsoft',
    'Google',
    'Meta',
    'Amazon',
    'Tesla Motors',
    'Space X'
  ]);
  const [selectedCompany, setSelectedCompany] = useState('');

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

MyComponent.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Modal;