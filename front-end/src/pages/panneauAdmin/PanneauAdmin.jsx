import React, { useState } from 'react'; //Importe le hook useState
import "./panneauAdmin.css"
import { FaSearch } from 'react-icons/fa';
import { IoMdAddCircle } from "react-icons/io";
import { BiMailSend } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import ModalNotifier from "../../pages/Notifier/Notifier.jsx";
import listUsers from '../../requests/list_users.js';

const PanneauAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchFirm, setSearchFirm] = useState('');
  const [filterFirm, setFilterFirm] = useState([]);
  const [users, setUsers] = useState([])

  // Utilise le hook useEffect pour effectuer une action après le rendu initial du composant
  React.useEffect(() => {
    // Effectue une requête GET pour récupérer les recettes depuis l'API
      listUsers()
      .then(data => {
        if(data == null){
          return 
        }
        console.log(data);
        // Met à jour le state 'recettes' avec les données récupérées
        setUsers(data);
        // Initialise les recettes filtrées avec toutes les recettes au départ
        setFilterFirm(data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  const handleSearch = (e) => {
    e.preventDefault()
    //valeur actuelle, ce qui est tapé par l'utilisateur
    const word = e.target.value
    setSearchFirm(word)
    // Filtrer les recettes en fonction du terme de recherche
    const filtered = users.filter(user =>
      user.firm_name.toLowerCase().includes(word.toLowerCase())
    );

    // Met à jour le state 'filteredRecettes' avec les recettes filtrées
    setFilterFirm(filtered);
  }

  return (
    <>
      <div className="bandeau">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher"
            className="text-input"
            value={searchFirm}
            onChange={handleSearch}
          />
        </div>
      </div>
      {filterFirm.map((firm) => (
        <div key={firm.id} className="cards">
          <Card />
        </div>
      ))}
      <footer>
        <div className="logos-footer">
          <Link to="/entreprises">
            <IoMdAddCircle className="icon-style" />
          </Link>
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
