
import { useState } from 'react'; //Importe le hook useState
import "./panneauAdmin.css"
import { FaSearch } from 'react-icons/fa';
import { IoMdAddCircle } from "react-icons/io";
import { BiMailSend } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import ModalNotifier from "../../pages/Notifier/Notifier.jsx";

const PanneauAdmin = () => {
  const [showModal, setShowModal] = useState(false);

  const [toggleStates, setToggleStates] = useState({
    cmnToggle1: false,
    cmnToggle2: false,
    cmnToggle3: false,
    cmnToggle4: false,
    cmnToggle5: false
  });

  // Fonction pour gérer le changement d'état de la case à cocher "toggleicon"
  // Cette fonction sera appelée à chaque fois que l'utilisateur clique sur la case à cocher
  const handleCheckboxChange = (id) => {
    setToggleStates(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
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
        <Card toggleStates={toggleStates} handleCheckboxChange={handleCheckboxChange}/>
      </div>
      <footer>
        <div className="logos-footer">
          <NavLink to="/entreprises">
            <IoMdAddCircle className="icon-style" />
          </NavLink>
          <BiMailSend
            className="icon-style"
            onClick={() => {
              setShowModal(!showModal);
            }}
          />

          {showModal && (
            <ModalNotifier
            />
          )}
        </div>
      </footer>
    </>
  );
};

export default PanneauAdmin;
