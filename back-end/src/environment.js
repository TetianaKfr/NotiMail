
export const PORT = process.env.NOTIMAIL_PORT;
if (PORT == undefined) {
  console.error("The 'NOTIMAIL_PORT' environment variable should be set");
  process.exit(-1);
}

export const DATABASE_HOST = process.env.DATABASE_HOST;
if (DATABASE_HOST == undefined) {
  console.error("The 'NOTIMAIL_DATABASE_HOST' environment variable should be set");
  process.exit(-1);
}

export const DATABASE_NAME = process.env.DATABASE_NAME;
if (DATABASE_NAME == undefined) {
  console.error("The 'NOTIMAIL_DATABASE_NAME' environment variable should be set");
  process.exit(-1);
}

export const DATABASE_USER = process.env.DATABASE_USER;
if (DATABASE_USER == undefined) {
  console.error("The 'NOTIMAIL_DATABASE_USER' environment variable should be set");
  process.exit(-1);
}

export const DATABASE_PASSWORD = process.env.NOTIMAIL_DATABASE_PASSWORD;
if (DATABASE_PASSWORD == undefined) {
  console.error("The 'NOTIMAIL_DATABASE_PASSWORD' environment variable should be set");
  process.exit(-1);
}
