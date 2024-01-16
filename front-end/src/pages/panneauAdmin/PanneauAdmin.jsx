
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

  return (
    <>
      <div className="bandeau">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Rechercher..." />
        </div>
      </div>
      <div className="cards">
        <Card id="1" />
        <Card id="2" />
        <Card id="3"/>
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
