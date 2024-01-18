import { useState } from "react"; //Importe le hook useState
import "./panneauAdmin.css";
import { FaSearch } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { BiMailSend } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { Card } from "../../components/Card/Card";
import ModalNotifier from "../../pages/Notifier/Notifier.jsx";

const PanneauAdmin = () => {
  const [showModal, setShowModal] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  // const [open, setOpen] = useState(false);

  // const onOpenModal = () => setOpen(true);
  // const onCloseModal = () => setOpen(false);

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
          <input type="text" placeholder="Rechercher" className="text-input" />
        </div>
      </div>
      <div className="cards">
        <Card id="1" />
        <Card id="2" />
        <Card id="3" />
      </div>
      <div className="logos-footer">
        <NavLink to="/entreprises">
          <IoMdAddCircle className="icon-style" />
        </NavLink>
      </div>
      <footer>
        <div className="logos-footer"></div>
        <BiMailSend
          className="icon-style"
          onClick={() => {
            setShowModal(!showModal);
          }}
        />

        {showModal && (
          <ModalNotifier show={showModal} setShowModal={setShowModal} />
        )}
        <Card id="3" />
        <Card id="4" />
        <Card id="5" />
      </footer>
    </>
  );
};

export default PanneauAdmin;
