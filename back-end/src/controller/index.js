import mysql from "mysql";

import { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } from "../environment.js"

class Controller {
  #connection;

  constructor() {
    this.#connection = mysql.createConnection({
      host: DATABASE_HOST,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
    });

    this.#connection.connect((err) => {
      if (err) {
        console.error("Failed to connect to my database '" + DATABASE_NAME + "': ", err.stack);
        process.exit(-1);
      }

      console.log("Connected to mysql database database '" + DATABASE_NAME + "'");
    });
  }
}

export let controller = new Controller();
