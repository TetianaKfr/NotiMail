import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BtnConnect = () => {
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
    if (password === "mdp") {
      setIsAdmin(true);
      navigate("/admin");
    } else if (password === "PASSWORD") {
      setIsAdmin(false);
      navigate("/user");
    } else {
      // setErrorMessage("Mot de passe incorrect.");
      setTimeout(() => {
        setErrorMessage("");
      }, 10000);
    }
  }

  return (
    <form className="password-input" onSubmit={handleSubmit}>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      
      <img src="src/assets/images/padlock.png" alt="submit" onClick={handleSubmit} />
     
      {errorMessage && <div>{errorMessage}</div>}
      {isAdmin && (
        <div style={{ color: "green" }}>
          Vous êtes connecté en tant que administrateur.
        </div>
      )}
    </form>
  );
}

export default BtnConnect;