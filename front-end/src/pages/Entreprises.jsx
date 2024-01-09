//  import ReactDOM from "react-dom";
//  import Logo from "../assets/logo.png";

import React, { Component } from "react";

export const Entreprises = () => {
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
        <label>
          Entreprise :
          <input type="text" name="entreprise" value={values.entreprise} onChange={handleChange} />
        </label>
        <br />
        <label>
          Contact :
          <input type="text" name="contact" value={values.contact} onChange={handleChange} />
        </label>
        <br />
        <label>
          Téléphone :
          <input type="text" name="telephone" value={values.telephone} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email :
          <input type="email" name="email" value={values.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Identifiant :
          <input type="text" name="identifiant" value={values.identifiant} onChange={handleChange} />
        </label>
        <br />
        <label>
          Admin :
          <input type="checkbox" name="admin" checked={values.admin} onChange={handleChange} />
        </label>
        <br />
        <button id="terminer" type="submit">Terminer</button>
        <button id="supprimer" type="button" onClick={() => {}}>Supprimer</button>
      </form>
    );
  }