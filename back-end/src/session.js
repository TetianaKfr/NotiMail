/**
 * Représente une session de connection
 */
export default class Session {
  /**
   * Le nom de l'entreprise associée à la session
   * @type {string | undefined}
   */
  firm_name;
  /**
   * Token aléatoire en base64 stockée également dans la base de données
   * @type {string | undefined}
   */
  token;

  /**
   * Récupère le token depuis la bearer authentification de la requête
   * @see https://datatracker.ietf.org/doc/html/rfc6750
   * @param {Request} req - Requête depuis laquelle le token est récupérer
   */
  constructor(req) {
    if (req.token == undefined) {
      return;
    }

    let [token, ...firm_name_parts] = req.token.split(':');
    this.token = token;
    this.firm_name = firm_name_parts.join(':');
  }
}
