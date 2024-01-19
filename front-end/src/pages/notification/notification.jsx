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
        <div className="modal-overlay">
        </div>
        <dialog ref={dialog}>
        <p>Je suis le dialogue</p>
        <button onClick={() => { props.cancel(false) }}>annuler</button>
                    <button onClick={() => { props.validate(true) }}>valider</button>
      </dialog>
      <button type="button" onClick={openHandler}>
        Réceptionner
      </button>
        </>
    );
}

// Composant Notification : Gère l'affichage du Modal et le bouton de confirmation.
const Notification = () => {
    // State isOpen pour contrôler l'affichage du Modal
    const [isOpen, setIOpen] = useState(false);

    // Fonction pour gérer l'action de confirmation
    const onConfirm = () => {
        setIOpen(true);
        console.log('Confirmation effectuée');
    };

    const onCancel = () => {
        setIOpen(false);
    }

    const onValidate = () => {
        setIOpen(false);
        alert("Courrier reçu");
    }

    return (
        <>
            <div className='alert'>
                <span>{`Confirmer la réception du courrier : `} </span>
                <div className="button-container">
                    {/* Bouton pour déclencher la confirmation et afficher le Modal */}
                    <button onClick={onConfirm}>confirmer la reception</button>
                </div>
            
            {/* Affiche le Modal si isOpen est vrai */}
            {isOpen && <Modal cancel={onCancel} validate={onValidate} />}
            </div>
        </>
    );
}

export default Notification;