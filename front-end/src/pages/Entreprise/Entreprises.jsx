import React from "react";
import { TiArrowLeftThick } from "react-icons/ti";

const Entreprises = () => {
  const [values, setValues] = React.useState({
    entreprise: '',
    contact: '',
    telephone: '',
    email: '',
    identifiant: '',
    admin: false,
  });

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setValues({
      ...values,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulaire soumis :', values);
  }

  return (

    <form id="form" onSubmit={handleSubmit}>

      <div className="header-entreprise">
        <span> <TiArrowLeftThick className="back-icon" /></span>
        <h2 className="entreprise-title">Entreprise</h2>
        </div>
        
        <div>
        <label>
          Entreprise :
          <input type="text" name="entreprise" value={values.entreprise} onChange={handleChange} />
        </label>
      </div>

      <div className="contact">
        <label>
          Contact :
          <input type="text" name="nom" placeholder="Nom" value={values.contact} onChange={handleChange} />
          <input type="text" name="prenom" placeholder="Prenom" value={values.contact} onChange={handleChange} />
        </label>
      </div>

      <div className="telephone">
        <label>
          Téléphone :
          <input type="text" name="telephone" value={values.telephone} onChange={handleChange} />
        </label>
      </div>

      <div className="email">
        <label>
          Email :
          <input type="email" name="email" value={values.email} onChange={handleChange} />
        </label>
      </div>

      <div className="identifiant">
        <label>
          Identifiant :
          <input type="text" name="identifiant" value={values.identifiant} onChange={handleChange} />
        </label>
      </div>

      <div className="admin">
        <label>
          Admin :
          <input type="checkbox" name="admin" checked={values.admin} onChange={handleChange} />
        </label>
      </div>

      <div className="button">
        <button id="terminer" type="submit">Terminer</button>
        <button id="supprimer" type="button" onClick={() => { }}>Supprimer</button>
      </div>

    </form>
  );
}

export default Entreprises;