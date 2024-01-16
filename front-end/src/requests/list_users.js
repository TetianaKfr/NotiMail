import { SERVER_ADDRESS } from ".";

/**
 * Retourne la list de tout les noms d'entreprise
 * @return {string | null} La liste des noms d'entreprise ou null si la requête à échoué
 */
export default async function list_users() {
  const response = await fetch(SERVER_ADDRESS + "list_users", {
    method: "GET",
  });

  if (response.ok()) {
    return response.body();
  } else {
    return null;
  }
}
