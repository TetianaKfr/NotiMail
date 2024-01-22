import { useState } from 'react';
import './notification.css';
import MailRedDot from '../../assets/images/mail-reddot.svg';
import Modal from '../UserModal/UserModal.jsx'; 

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(!isOpen);
  const closeModal = () => setIsOpen(false);

  return (
    <div className='alert'>
       <img className="logo" src={MailRedDot} alt="Logo" />
      <div className="button-container">
        {/* Lorsque vous cliquez sur ce bouton, la modal s'ouvrira */}
        <button onClick={openModal}>Réceptionner</button>
      </div>
      {isOpen && <Modal onClose={closeModal} />}
    </div>
  );
}

export default Notification;
