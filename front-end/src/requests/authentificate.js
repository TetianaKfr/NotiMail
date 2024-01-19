import { SERVER_ADDRESS } from "./index.js";

/**
 * Génère une token d'authentification qui sera utilisé dans les prochaines requêtes
 * @param {string} firm_name - Nom de l'entreprise à authentifier
 * @param {string} password - Mot de passe de l'entreprise à authentifier
 * @returns {boolean} Retourne `true` si l'authentication à réussi, sinon renvoie `false`
 */
export default async function authentificate(firm_name, password) {
  const response = await fetch(SERVER_ADDRESS + "authentificate", {
    method: "POST",
    body: {
      firm_name: firm_name,
      password: password,
    }
  });

  if (response.ok) {
    window.localStorage.setItem("token", response.json().token);
    return true;
  } else {
    return false;
  }
}
