import React, { useState } from 'react'; //Importe le hook useState
import { useNavigate } from 'react-router-dom';
import "./panneauAdmin.css"
import { FaSearch } from 'react-icons/fa';
import { IoMdAddCircle } from "react-icons/io";
import { BiMailSend } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import ModalNotifier from "../../pages/Notifier/Notifier.jsx";
import listUsers from '../../requests/list_users.js';
import getUser from "../../requests/get_user.js";

const PanneauAdmin = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  // Liste d'utilisateur tel que retourner par getUser plus le champ unstaged_has_mail
  const [users, set_users] = useState([])
  // Liste d'index dans le state users
  const [filtered_users, set_filtered_users] = useState([]);

  // Utilise le hook useEffect pour effectuer une action après le rendu initial du composant
  React.useEffect(() => {
    // Effectue une requête GET pour récupérer les recettes depuis l'API
    listUsers()
      .then(firm_names => {
        if (firm_names == null) {
          return;
        }

        return Promise.all(firm_names.map(async (firm_name) => {
          let user = await getUser(firm_name);
          if (user == null) {
            navigate("/");
            return;
          }
          return {
            unstaged_has_mail: user.has_mail,
            ...user
          };
        }));
      })
      .then((users) => {
        set_users(users);
        set_filtered_users(Array.from(users.keys()))
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  const handleSearch = (e) => {
    const filters = e.target.value.split(/[\s,;.:]+/);

    set_filtered_users(Array.from(users.keys()).filter(i => {
      let user = users[i];

      return filters.every(filter => {
        return [
          user.firm_name,
          user.first_name,
          user.last_name,
          user.email,
          user.phone_number
        ]
          .some(e => e.includes(filter));
      });
    }));
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
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="cards">
        {filtered_users.map(i => {
          return <Card key={i} user={users[i]} />;
        })}
      </div>

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
