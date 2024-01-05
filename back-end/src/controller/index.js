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
    this.connect();
  }

  connect() {
    this.#connection = mysql.createConnection({
      host: DATABASE_HOST,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
    });

    this.#connection.connect((err) => {
      if (err) {
        console.log(err.errno);
        if (err.errno == 1049 /* Database doesn't exists */) {
          let connection = mysql.createConnection({
            host: DATABASE_HOST,
            user: DATABASE_USER,
            password: DATABASE_PASSWORD,
          });

          connection.query("CREATE DATABASE " + DATABASE_NAME, (err, _results) => {
            if (err) {
              console.error("Failed to create database '" + DATABASE_NAME + "': " + err.stack);
              process.exit(-1);
            }

            console.log("Created database '" + DATABASE_NAME + "'");

            this.connect();
            this.initialize_database();
          });
          return;
        }

        console.error(
          "Failed to connect to my database '" + DATABASE_NAME + "': ",
          err.stack
        );
        process.exit(-1);
      }

      console.log(
        "Connected to mysql database database '" + DATABASE_NAME + "'"
      );
    })
  }

  initialize_database() {
    let initialization_query = 
      "CREATE TABLE IF NOT EXISTS `users` (" +
      "`firm_name` varchar(25) NOT NULL," +
      "`first_name` varchar(25) DEFAULT NULL," +
      "`last_name` varchar(25) DEFAULT NULL," +
      "`email` varchar(50) NOT NULL," +
      "`phone_number` varchar(25) NOT NULL," +
      "`password` varchar(25) NOT NULL," +
      "`last_received_mail` timestamp NULL DEFAULT NULL," +
      "`last_picked_up` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," +
      "`has_mail` bit(1) NOT NULL DEFAULT b'0'," +
      "`is_admin` bit(1) NOT NULL DEFAULT b'0'," +
      "PRIMARY KEY (`firm_name`)" +
      ");"
    ;
    
    this.#connection.query(initialization_query, (err, _results) => {
      if (err) {
        console.error("Failed to setup database '" + DATABASE_NAME + "': " + err.stack);
      } else {
        console.log("Database '" + DATABASE_NAME + "' initialized");
      }
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
