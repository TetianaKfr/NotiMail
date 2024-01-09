import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const BtnConnect = () => {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) {
      alert(
        "Vous ne pouvez pas envoyer plus d'une demande de connexion toutes les 10 secondes."
      );
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 10000);
    if (password === "monMotDePasse") {
      setIsAdmin(true);
      navigate("/admin");
    } else if (password === "<PASSWORD>") {
      setIsAdmin(false);
      navigate("/user");
    } else {
      setErrorMessage("Mot de passe incorrect.");
      setTimeout(() => {
        setErrorMessage("");
      }, 10000);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Button variant="primary" type="submit">
          Se connecter
        </Button>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
      {isAdmin && (
        <div style={{ color: "green" }}>
          Vous êtes connecté en tant qu administrateur.
        </div>
      )}
    </form>
  );
}
