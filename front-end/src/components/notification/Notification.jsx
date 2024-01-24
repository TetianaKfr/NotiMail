import Valid from '../../assets/images/vector-valid.svg'
import Cross from '../../assets/images/vector-cross.svg'
import MailRedDot from '../../assets/images/mail-reddot.svg'
import React, { useState, useRef } from 'react';
import './notification.css';

// Composant Modal : C'est un modal simple qui apparaît lorsque isOpen est vrai. 
// Il contient deux boutons - un pour confirmer et un autre pour annuler.
const Modal = (props) => {

  const dialog = useRef(null);

  const openHandler = () => {
    dialog.current.showModal();
  }

  const closeHandler = () => {
    dialog.current.close();
  }

  return (
    <>
      <div className="modal">
        <dialog className='modal-reception' ref={dialog}>
          <p>Confirmer la réception du courrier</p>
          <div className='ValidCross'>
            <button className="Cross" onClick={() => { closeHandler() }}><img src={Cross} /></button>
            <button className="Valid" onClick={() => { closeHandler(); props.validate() }}><img src={Valid} /></button>
          </div>
        </dialog>
        <button className="receptionner" type="button" onClick={openHandler}>
          Réceptionner
        </button>
      </div>
    </>
  );
}

// Composant Notification : Gère l'affichage du Modal et le bouton de confirmation.
const Notification = () => {


  const onValidate = () => {
    alert("Courrier reçu");
  }

  return (
    <>
      <div className='alert'>
        <div className='image-mail-attente'>
          <img src={MailRedDot}
            className='MailIcon'
            alt="e-mail en attente" />
        </div>
        <div className="string-container">
          {/* Bouton pour déclencher la confirmation et afficher le Modal */}
          <span >Vous avez du courrier en attente</span>
        </div>

        {/* Affiche le Modal si isOpen est vrai */}
        <Modal validate={onValidate} />
      </div>
    </>
  );
}

export default Notification;
