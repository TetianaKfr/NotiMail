import React from 'react';
import './notification.css';

// Composant Modal : C'est un modal simple qui apparaît lorsque isOpen est vrai. 
// Il contient deux boutons - un pour confirmer et un autre pour annuler.
const Modal = (props) => {
    return (
        <>
            <div style={{ background: 'red' }}>
                Modal
                <div>
                    <button>confirmer</button>
                    {/* Le bouton "annuler" utilise la fonction passée via props pour changer l'état de isOpen */}
                    <button onClick={() => { props.cancel(false) }}>annuler</button>
                </div>
            </div>
        </>
    );
}

// Composant Notification : Gère l'affichage du Modal et le bouton de confirmation.
const Notification = () => {
    // State isOpen pour contrôler l'affichage du Modal
    const [isOpen, setIOpen] = React.useState(false);

    // Fonction pour gérer l'action de confirmation
    const onConfirm = () => {
        setIOpen(true);
        console.log('Confirmation effectuée');
    };

    return (
        <>
            {/* Affiche le Modal si isOpen est vrai */}
            {isOpen && <Modal cancel={setIOpen} />}
            <div className='alert'>
                <span>{`Confirmer la réception du courrier : `} </span>
                <div className="button-container">
                    {/* Bouton pour déclencher la confirmation et afficher le Modal */}
                    <button onClick={onConfirm}>confirmer la reception</button>
                </div>
            </div>
        </>
    );
}

export default Notification;
