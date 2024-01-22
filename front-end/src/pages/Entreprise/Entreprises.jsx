import React from "react";
import { TiArrowLeftThick } from "react-icons/ti";
import "../Entreprise/entreprise.css";
import { ImArrowLeft2 } from "react-icons/im";

const Entreprises = () => {
  const [values, setValues] = React.useState({
    entreprise: "",
    contact: "",
    telephone: "",
    email: "",
    identifiant: "",
    admin: false,
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
                name="entreprise"
                value={values.entreprise}
                onChange={handleChange}
                placeholder="*********"
              />
            </div>
            <div className="formulaire">
              <label>Contact :</label>
              <div className="formulaireContact">
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={values.contact}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prenom"
                  value={values.contact}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="formulaire">
              <label>Téléphone :</label>
              <input
                type="text"
                name="telephone"
                value={values.telephone}
                onChange={handleChange}
                placeholder="*********"
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
                name="identifiant"
                value={values.identifiant}
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
                  name="admin"
                  checked={values.admin}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="button">
              <button style={{border:"unset !important"}} id="terminer" type="submit">
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
