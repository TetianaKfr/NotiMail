import { useLocation } from 'react-router-dom';
import './navbar.css';
import logoMail from '../../assets/images/logo-notimail.png';

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;

  // Ne pas afficher la Navbar sur les pages spécifiées
  if (pathname === '/' || pathname === '/entreprises') {
    return null;
  }

  return (
    <>
      <div className='ma-navbar'>
        <div className='left'>
          <nav className='logomail'>
            <img src={logoMail} alt="logo-note-mail" />
          </nav>
        </div>
        <div className="right">
          <span className="ent-ou-admin">Admin</span>
          <button onClick={() => { console.log("deconnexion") }} id="deconnexion">Déconnexion</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
