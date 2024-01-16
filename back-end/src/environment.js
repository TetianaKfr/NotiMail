/**
 * Port du serveur http,
 * stocké dans le .env
 * @type {string}
 */
export const PORT = process.env.NOTIMAIL_PORT;
if (PORT == undefined) {
  console.error("The 'NOTIMAIL_PORT' environment variable should be set");
  process.exit(-1);
}

/**
 * Hôte de la base de donnée, example: `localhost`,
 * stocké dans le .env
 * @type {string}
 */
export const DATABASE_HOST = process.env.NOTIMAIL_DATABASE_HOST;
if (DATABASE_HOST == undefined) {
  console.error(
    "The 'NOTIMAIL_DATABASE_HOST' environment variable should be set"
  );
  process.exit(-1);
}

/**
 * Nom de la base de données mysql,
 * stocké dans le .env
 * @type {string}
 */
export const DATABASE_NAME = process.env.NOTIMAIL_DATABASE_NAME;
if (DATABASE_NAME == undefined) {
  console.error(
    "The 'NOTIMAIL_DATABASE_NAME' environment variable should be set"
  );
  process.exit(-1);
}

/**
 * Nom de l'utilisateur mysql,
 * stocké dans le .env
 * @type {string}
 */
export const DATABASE_USER = process.env.NOTIMAIL_DATABASE_USER;
if (DATABASE_USER == undefined) {
  console.error(
    "The 'NOTIMAIL_DATABASE_USER' environment variable should be set"
  );
  process.exit(-1);
}

/**
 * Mot de passe de l'utilisateur mysql,
 * stocké dans le .env
 * @type {string}
 */
export const DATABASE_PASSWORD = process.env.NOTIMAIL_DATABASE_PASSWORD;
if (DATABASE_PASSWORD == undefined) {
  console.error(
    "The 'NOTIMAIL_DATABASE_PASSWORD' environment variable should be set"
  );
  process.exit(-1);
}

/**
 * Port de la base de données mysql,
 * stocké dans le .env ou 3306 par défaut
 * @type {string}
 */
let mysql_port = process.env.NOTIMAIL_MYSQL_PORT;
if (mysql_port == undefined) {
  console.log(
    "The 'NOTIMAIL_MYSQL_PORT' environment variable is not set, defaulting to 3306"
  );
  mysql_port = 3306;
}
export const MYSQL_PORT = mysql_port;
