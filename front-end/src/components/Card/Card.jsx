/* eslint-disable react/prop-types */
import "./card.css"

export const Card = ({ toggleStates, handleCheckboxChange }) => {
  return (
    <div className="card" id="Entreprise">
      <div className="content-left" > {/* Conteneur flex pour aligner le titre et l'input */}
        <div className="inline-items">
          <h3>Entreprise</h3>
          <p>Nom contact</p>
          <p>Date</p>
        </div>
      </div>
        <div className="content-right">
          <input
            id="cmn-toggle-1"
            className="cmn-toggle cmn-toggle-round"
            type="checkbox"
            checked={toggleStates.cmnToggle1}
            onChange={() => handleCheckboxChange('cmnToggle1')}
          />
          <label htmlFor="cmn-toggle-1"></label>
       
        <input className="img-button" type="image" src="src/assets/images/option.png" alt="Submit" />
        </div>

    </div>
  );
};
