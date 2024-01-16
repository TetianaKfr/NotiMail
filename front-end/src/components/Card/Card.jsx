import { useState } from 'react';
import "./card.css"

export const Card = ({ id }) => {
  const [toggleState, setToggleState] = useState(false);

  const handleToggleChange = () => {
    setToggleState(!toggleState);
  };

  return (
    <div className="card" id={`Entreprise-${id}`}>
      <div className="content-left">
        <div className="inline-items">
          <h3>Entreprise</h3>
          <p>Nom contact</p>
          <p>Date</p>
        </div>
      </div>
      <div className="content-right">
        <input
          id={`cmn-toggle-${id}`}
          className="cmn-toggle cmn-toggle-round"
          type="checkbox"
          checked={toggleState}
          onChange={handleToggleChange}
        />
        <label htmlFor={`cmn-toggle-${id}`}></label>
        <input className="img-button" type="image" src="src/assets/images/option.png" alt="Submit" />
      </div>
    </div>
  );
};
