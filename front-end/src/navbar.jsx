import "./navbar.css"
import logoMail from '../images/LogoByMathysG.jpg'

export const Navbar = () => {

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
        <button id="deconnexion">Déconnexion</button>
      </div>
    </div>
  </>
)
}