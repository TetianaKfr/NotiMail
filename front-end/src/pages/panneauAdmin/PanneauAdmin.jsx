import Logo from "../../assets/images/logo-notimail.png";
import { FaSearch } from 'react-icons/fa';
import { IoMdAddCircle } from "react-icons/io";
import { BiMailSend } from "react-icons/bi";
import { NavLink } from 'react-router-dom';

const PanneauAdmin = () => {

  return (
    <>
      <img id="logo" src={Logo} alt="Logo" />
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Rechercher..." />
      </div>
      <div id="Entreprises">
        <div id="Entreprise1">
          <h3>Entreprise 1</h3>
          <ul>
            <li>Nom</li>
            <li>Contact</li>
            <li>Date</li>
          </ul>
        </div>
        <div id="Entreprise2">
          <h3>Entreprise 2</h3>
          <ul>
            <li>Nom</li>
            <li>Contact</li>
            <li>Date</li>
          </ul>
        </div>
        <div id="Entreprise3">
          <h3>Entreprise 3</h3>
          <ul>
            <li>Nom</li>
            <li>Contact</li>
            <li>Date</li>
          </ul>
        </div>
        <div id="Entreprise4">
          <h3>Entreprise 4</h3>
          <ul>
            <li>Nom</li>
            <li>Contact</li>
            <li>Date</li>
          </ul>
        </div>
        <div id="Entreprise5">
          <h3>Entreprise 5</h3>
          <ul>
            <li>Nom</li>
            <li>Contact</li>
            <li>Date</li>
          </ul>
        </div>

      </div>
      <NavLink to="/entreprises">
        <IoMdAddCircle id="add" />
      </NavLink>
      <BiMailSend id="send-mail" />

    </>
  )
};

export default PanneauAdmin;