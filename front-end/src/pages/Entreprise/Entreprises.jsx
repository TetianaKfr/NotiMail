import React from "react";
import { TiArrowLeftThick } from "react-icons/ti";
import "../Entreprise/entreprise.css";
import { ImArrowLeft2 } from "react-icons/im";

const Entreprises = () => {
  const [values, setValues] = React.useState({
    firm_name: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    is_admin: false,
  });

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formulaire soumis :", values);
  };

  return (
    <>
      <header className="home_header">
        <img
          className="home_logo"
          src="../../src/assets/images/logo-home.svg"
          alt="Logo"
        />
      </header>
      <div className="retour">
        <ImArrowLeft2 id="retour-icon" />
        <h2 className="entreprise-title">Entreprise</h2>
      </div>
      <div className="cardEntreprise">
        <div className="entreprises">
          <form id="form" onSubmit={handleSubmit}>
            <div className="formulaire">
              <label>Entreprise :</label>
              <input
                type="text"
                name="firm_name"
                value={values.firm_name}
                onChange={handleChange}
                placeholder="*********"
              />
            </div>
            <div className="formulaire">
              <label>Contact :</label>
              <div className="formulaireContact">
                <input
                  type="text"
                  name="last_name"
                  placeholder="Nom"
                  value={values.last_name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="first_name"
                  placeholder="Prenom"
                  value={values.first_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="formulaire">
              <label>Téléphone :</label>
              <input
                type="text"
                name="phone_number"
                value={values.phone_number}
                onChange={handleChange}
                placeholder="+33***********"
              />
            </div>

            <div className="formulaire">
              <label>Email :</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="*********"
              />
            </div>

            <div className="formulaire">
              <label>Identifiant :</label>
              <input
                type="text"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="****"
              />
            </div>

            <div className="formulaire">
              <label>
                Admin :
                <input
                  id="checkbox"
                  type="checkbox"
                  name="is_admin"
                  checked={values.is_admin}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="button">
              <button
                style={{ border: "unset !important" }}
                id="terminer"
                type="submit"
              >
                Terminer
              </button>
              <button id="supprimer" type="button" onClick={() => {}}>
                Supprimer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Entreprises;
