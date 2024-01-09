import "./navbar.css"
import logoMail from '/Users/malika.mezaoui/Documents/Ferhat/Cours imts/NotiMail/front-end/images/logo-notimail.png'

 const Navbar = () => {

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
        <button onClick={()=> {console.log("deconnexion")}} id="deconnexion">Déconnexion</button>
      </div>
    </div>
  </>
)
}
export default Navbar