import React, { useState } from 'react';
import Notification from '../notification/notification';


const PanneauUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [hasMail, setHasMail] = useState(true);

  const handleConfirm = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleValidate = () => {
    setHasMail(false);
    setShowModal(false);
    alert("Courrier reçu");
  };

  return (
    <>
      <Notification />
      <div className="panneau">
        <img src="../../src/assets/images/mail-reddot.svg" alt="mail icon"/>
        <h2>{hasMail ? "Vous avez du courrier en attente" : "Aucun courrier en attente"}</h2>
        <button onClick={handleConfirm}>Réceptionner</button>
        {showModal && (
          <div className="modal">
            <p>Confirmer la réception du courrier</p>
            <button onClick={handleCancel}>Annuler</button>
            <button onClick={handleValidate}>Valider</button>
          </div>
        )}
      </div>
    </>
  );
};

export default PanneauUser;