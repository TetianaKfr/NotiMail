import { SERVER_ADDRESS, getToken } from "./index.js";

/**
 * Déconnecte l'utilisateur actuellement connectée
 *
 * Un échec déconnecte tout de même l'utilisateur mais n'invalide pas le token
 *
 * @returns {Promise<boolean>} Renvoie `true` si la requête à réussi, `false` sinon.
 */
export default async function disconnect() {
  const response = await fetch(SERVER_ADDRESS + "disconnect", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${getToken()}`,
    },
  });

  window.localStorage.removeItem("token");

  if (response.ok) {
    return true;
  } else {
    return false;
  }
}
