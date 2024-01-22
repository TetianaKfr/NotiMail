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
      <div className="panneau">
        <img src="../../src/assets/images/mail-reddot.svg" alt="mail icon"/>

      <Notification />
      </div>
    </>
  );
};

export default PanneauUser;