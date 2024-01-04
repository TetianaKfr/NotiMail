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

  async executeQuery(query) {
    return new Promise((resolve, reject) => {
      this.#connection.query(query, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async getAllUsers() {
    try {
      const query = "SELECT * FROM users";
      let results = await this.executeQuery(query);

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

  async insertUser(
    firm_name,
    first_name,
    last_name,
    email,
    phone_number,
    password,
    last_received_mail,
    last_picked_up,
    has_mail,
    is_admin
  ) {
    try {
      const query = `
        INSERT INTO users (
          firm_name,
          first_name,
          last_name,
          email,
          phone_number,
          password,
          last_received_mail,
          last_picked_up,
          has_mail,
          is_admin
          )
        VALUES ('${firm_name}', '${first_name}', '${last_name}', '${email}', '${phone_number}', '${password}', '${last_received_mail}', '${last_picked_up}', '${has_mail}', '${is_admin}')
      `;

      await this.executeQuery(query);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(firm_name) {
    try {
      const query = `DELETE FROM users WHERE firm_name = '${firm_name}'`;
      await this.executeQuery(query);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    new_firm_name,
    new_first_name,
    new_last_name,
    new_email,
    new_phone_number,
    new_password,
    new_last_received_mail,
    new_last_picked_up,
    new_has_mail,
    new_is_admin
  ) {
    try {
      const query = `
    UPDATE users 
    SET 
      firm_name = '${new_firm_name}', 
      first_name = '${new_first_name}', 
      last_name = '${new_last_name}', 
      email = '${new_email}', 
      phone_number = '${new_phone_number}',
      password = '${new_password}', 
      last_received_mail = '${new_last_received_mail}', 
      last_picked_up = '${new_last_picked_up}', 
      has_mail = '${new_has_mail}', 
      is_admin = '${new_is_admin}'
    WHERE firm_name = '${new_firm_name}'`;

      console.log(query);
      await this.executeQuery(query);
    } catch (error) {
      throw error;
    }
  }
}

export let controller = new Controller();
