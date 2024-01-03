import mysql from "mysql";
import { Users } from "../model/users.js";

import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
} from "../environment.js";

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
        console.error(
          "Failed to connect to my database '" + DATABASE_NAME + "': ",
          err.stack
        );
        process.exit(-1);
      }

      console.log(
        "Connected to mysql database database '" + DATABASE_NAME + "'"
      );
    });
  }

  async getAllUsers() {
    try {
      const query = "SELECT * FROM users";
      const results = await this.#connection.executeQuery(query);

      const users = results.map(
        (result) =>
          new Users(
            result.firm_name,
            result.first_name,
            result.last_name,
            result.email,
            result.phone_number,
            result.password,
            result.last_received_mail,
            result.last_picked_up,
            result.has_mail,
            result.is_admin
          )
      );

      return users;
    } catch (error) {
      throw error;
    }
  }
}

export let controller = new Controller();
