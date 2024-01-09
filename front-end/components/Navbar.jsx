import { NavLink } from "react-router-dom";
import { Home } from "../src/pages/Home";
export const Navbar = () => {
  return (
    <>
      <div className="ma-navbar">
        <div className="left">
          <nav className="logo"></nav>
        </div>
        <div className="right">
          <span className="ent-ou-admin">Entreprise ***</span>
          <NavLink to="/">
            <button id="deconnexion">Déconnexion</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
