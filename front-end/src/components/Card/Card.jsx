// Importation des hooks et des styles nécessaires
import { useState } from 'react';
import "./card.css"
import { useNavigate } from 'react-router-dom';

// Définition du composant Card, qui prend un 'id' en tant que prop
export const Card = ({ id }) => {

  //la fonction navigate = useNavigate indispensable pour aller d'une page a une autre
  const navigate = useNavigate()

  // État pour gérer l'activation/désactivation du toggle (interrupteur)
  const [toggleState, setToggleState] = useState(false);

  // Gere si la carte est cliquee
  const [isClicked, setIsClicked] = useState(false);

  // Nouvel état pour gérer l'ouverture des détails (pour l'effet de glissement des détails)
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleClick = () => {
    setIsClicked(prevState => !prevState); // Inverse l'état précédent
    setDetailsOpen(prevState => !prevState); // Basculer l'état des détails lors du clic
  };

  const cardStyle = {
    borderRadius: isClicked ? '35px 35px 35px 35px':'35px 35px 0 0' 
  };

  // Gere le click sur l'image "option.png" qui navigate à /entreprises
  const handleModif = () => {
    navigate('/entreprises')
  };

  // Fonction pour gérer les changements d'état du toggle (interrupteur)
  const handleToggleChange = () => {
    setToggleState(!toggleState);
  };

  return (
    <details>
      <summary className={detailsOpen ? 'details-open' : ''}> {/*Condition pour le glissement en css*/}
        <div className="card" style={cardStyle} onClick={handleClick} id={`Entreprise-${id}`}>
          {/* Contenu de gauche de la carte */}

          <div className="content-left">
            <div className="inline-items">
              <h3>Entreprise</h3>
              <p>Nom contact</p>
              <p>Date</p>
            </div>
          </div>

          {/* Contenu de droite de la carte */}
          <div className="content-right">
            {/* Toggle (interrupteur) */}
            <input
              id={`cmn-toggle-${id}`}
              className="cmn-toggle cmn-toggle-round"
              type="checkbox"
              checked={toggleState}
              onChange={handleToggleChange}
            />
            <label htmlFor={`cmn-toggle-${id}`}></label>

            <input
              className="img-button"
              type="image"
              src="../../src/assets/images/option.svg"
              alt="Submit"
              onClick={handleModif}
            />
          </div>
        </div>
      </summary>
      <div className='wrapper-details'>
        <div className='details-right'>
          <p>Email</p>
          <p>Telephone</p>
          <p>Identifiant</p>
        </div>
        <div className='details-left'>
          <p>adresse-email@exemple.com</p>
          <p>+33601020304</p>
          <p>1337</p>
        </div>
      </div>
    </details>


  );
};
