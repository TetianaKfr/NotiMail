import {useState} from 'react'; //Importe le hook useState
import "./panneauAdmin.css"
import { FaSearch } from 'react-icons/fa';
import { IoMdAddCircle } from "react-icons/io";
import { BiMailSend } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import ModalNotifier from '../../pages/Notifier/Notifier.jsx';

  const PanneauAdmin  = ({ handleBiMailSendClick }) => {
    const [showModal, setShowModal] = useState(false);
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

  const [isChecked, setIsChecked] = useState(false);

  // Fonction pour gérer le changement d'état de la case à cocher "toggleicon"
  // Cette fonction sera appelée à chaque fois que l'utilisateur clique sur la case à cocher

  const handleCheckboxChange = (event) => {
    // Met à jour l'état 'isChecked' avec la noucelle valeur de la case à cocher
    setIsChecked(event.target.checked);
  };


  return (
    <>
    <div className="bandeau">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Rechercher..." />
        </div>
    </div>
      <div className="cards">
        <div className="card" id="Entreprise1">
        <div className="c-toggleicon02">
          {/* Input de type checkbox
            'checked' lie l'état de la checkbox à l'état 'isChecked'
            'onChange' déclenche 'handleCheckboxChange' lors d'un clic sur la checkbox */}
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <span className="icon"></span>
        </div>
          <h3>Entreprise 1</h3>
          <ul className="inline-items">
            <li>Nom</li>
            <li>Contact</li>
            <li>Date</li>
          </ul>
        </div>
        <div className="card" id="Entreprise2">
        <div className="c-toggleicon02">
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <span className="icon"></span>
        </div>
          <h3>Entreprise 2</h3>
          <ul className="inline-items">
            <li>Nom</li>
            <li>Contact</li>
            <li>Date</li>
          </ul>
        </div>
        <div className="card" id="Entreprise3">
        <div className="c-toggleicon02">
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <span className="icon"></span>
        </div>
          <h3>Entreprise 3</h3>
          <ul className="inline-items">
            <li>Nom</li>
            <li>Contact</li>
            <li>Date</li>
          </ul>
        </div>
        <div className="card" id="Entreprise4">
        <div className="c-toggleicon02">
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <span className="icon"></span>
        </div>
          <h3>Entreprise 4</h3>
          <ul className="inline-items">
            <li>Nom</li>
            <li>Contact</li>
            <li>Date</li>
          </ul>
        </div>
        <div className="card" id="Entreprise5">
        <div className="c-toggleicon02">
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <span className="icon"></span>
        </div>
          <h3>Entreprise 5</h3>
          <ul className="inline-items">
            <li>Nom</li>
            <li>Contact</li>
            <li>Date</li>
          </ul>
        </div>

      </div>
      <footer >
        <div className="logos-footer">
          <NavLink to="/entreprises">
            <IoMdAddCircle className="icon-style" />
          </NavLink>
          <button className="icon-style" onClick={handleBiMailSendClick}></button>
          <ModalNotifier show={showModal} handleClose={handleCloseModal} handleEnvoi={() => {}} />
        </div>
      </footer>
    </>
  );
};

export default PanneauAdmin;