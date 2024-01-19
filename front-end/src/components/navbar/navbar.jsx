import { useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';
import logoMail from "../../assets/images/logo-navbar.svg";

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate(); // Instance de useNavigate

  // Ne pas afficher la Navbar sur les pages spécifiées
  if (pathname === '/' || pathname === '/entreprises') {
    return null;
  }
  
  const handleLogout = () => {
    console.log("Déconnexion");
    navigate('/'); // Navigue vers la page d'accueil
  };


  return (
    <>
      <div className='ma-navbar'>
        <div className='left'>
          <nav className='logomail'>
            <img src={logoMail} alt="logo-note-mail" />
          </nav>
        </div>
        <div className="right">
          {/* Affiche "Admin" si la page est '/admin', sinon "Utilisateur" */}
          <span className="ent-ou-admin">{pathname === '/admin' ? 'Admin' : 'Utilisateur'} </span>
          <button onClick={handleLogout} id="deconnexion">Déconnexion</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
