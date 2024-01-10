import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const BtnConnect = () => {
  //utilise plusieurs hooks pour stocker l’état local du formulaire de connexion
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  // est appelée lorsque l’utilisateur soumet le formulaire. Cette fonction vérifie si l’utilisateur a déjà soumis le formulaire dans les 10 dernières secondes, puis met à jour l’état local en conséquence
  function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) {
      alert(
        "Vous ne pouvez pas envoyer plus d'une demande de connexion toutes les 10 secondes."
      );
      return;
    }
    //Si le mot de passe entré par l’utilisateur est correct, la fonction met à jour l’état local pour indiquer que l’utilisateur est connecté en tant qu’administrateur ou utilisateur, puis navigue vers la page appropriée. Sinon, la fonction affiche un message d’erreur.
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 10000);
    if (password === "mdp") {
      setIsAdmin(true);
      navigate("/admin");
    } else if (password === "PASSWORD") {
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
      {/* Affichez le message d'erreur si le mot de passe est incorrect */}
      {errorMessage && <div>{errorMessage}</div>}
      {/* Affichez un message de confirmation si l'utilisateur est connecté en tant qu'administrateur */}
      {isAdmin && (
        <div style={{ color: "green" }}>
          Vous êtes connecté en tant que administrateur.
        </div>
      )}
    </form>
  );
}

export default BtnConnect;