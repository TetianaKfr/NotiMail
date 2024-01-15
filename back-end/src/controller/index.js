import mysql from "mysql";
import { Users } from "../model/users.js";

import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  MYSQL_PORT,
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
      port: MYSQL_PORT,
    });

    this.#connection.connect((err) => {
      if (err) {
        console.log(err.errno);
        if (err.errno == 1049 /* Database doesn't exists */) {
          let connection = mysql.createConnection({
            host: DATABASE_HOST,
            user: DATABASE_USER,
            password: DATABASE_PASSWORD,
            port: MYSQL_PORT,
          });

          connection.query(
            "CREATE DATABASE " + DATABASE_NAME,
            (err, _results) => {
              if (err) {
                console.error(
                  "Failed to create database '" +
                    DATABASE_NAME +
                    "': " +
                    err.stack
                );
                process.exit(-1);
              }

              console.log("Created database '" + DATABASE_NAME + "'");

              this.connect();
              this.initialize_database();
            }
          );
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
    });
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
      ");";
    this.#connection.query(initialization_query, (err, _results) => {
      if (err) {
        console.error(
          "Failed to setup database '" + DATABASE_NAME + "': " + err.stack
        );
      } else {
        console.log("Database '" + DATABASE_NAME + "' initialized");
        res
          .status(500)
          .send("Erreur de l'initialisation de la base de données");
      }
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
    const query = "SELECT firm_name FROM users";
    let results = await this.executeQuery(query);

    // Vérifier si les résultats sont vides
    if (results.length === 0) {
      throw new Error("Aucun utilisateur trouvé");
    }

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
          result.has_mail[0] != 0,
          result.is_admin[0] != 0
        )
    );
    console.log(users);

    return users;
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
        VALUES ('${firm_name}', '${first_name}', '${last_name}', '${email}', '${phone_number}', '${password}', '${last_received_mail}', '${last_picked_up}', b'${has_mail}', b'${is_admin}')
      `;

    await this.executeQuery(query);
  }

  async deleteUser(firm_name) {
    const query = `DELETE FROM users WHERE firm_name = '${firm_name}'`;
    await this.executeQuery(query);
  }

  async updateUser(
    new_firm_name,
    new_first_name,
    new_last_name,
    new_email,
    new_phone_number,
    new_password,
    new_has_mail,
    new_is_admin
  ) {
    let updated_fields = [];

    if (new_firm_name != undefined) {
      updated_fields.push(`firm_name = '${new_firm_name}'`);
    }

    if (new_first_name != undefined) {
      updated_fields.push(`first_name = '${new_first_name}'`);
    }

    if (new_last_name != undefined) {
      updated_fields.push(`last_name = '${new_last_name}'`);
    }

    if (new_email != undefined) {
      updated_fields.push(`email = '${new_email}'`);
    }

    if (new_phone_number != undefined) {
      updated_fields.push(`phone_number = '${new_phone_number}'`);
    }

    if (new_password != undefined) {
      updated_fields.push(`password = '${new_password}'`);
    }

    if (new_has_mail != undefined) {
      updated_fields.push(`has_mail = '${new_has_mail ? 1 : 0}'`);
      if (new_has_mail) {
        updated_fields.push(`last_received_mail = NOW()`);
      } else {
        updated_fields.push(`last_picked_up = NOW()`);
      }
    }

    if (new_is_admin != undefined) {
      updated_fields.push(`is_admin = '${new_is_admin}'`);
    }

    const querybody = updated_fields.join(",");

    const query = `
    UPDATE users 
    SET 
    ${querybody}
    WHERE firm_name = '${new_firm_name}'`;

    console.log(query);
    await this.executeQuery(query);
  }

  async getUserByFirmName(firm_name) {
    const query = `SELECT 
      first_name,
      last_name,
      email,
      phone_number,
      last_received_mail,
      last_picked_up,
      has_mail,
      is_admin
      FROM users
      WHERE firm_name = '${firm_name}'`;
    let result = await this.executeQuery(query);

    if (result && result.length > 0) {
      // Vérifie si des résultats sont renvoyés et s'il y a au moins une ligne dans les résultats
      // Convertit le champ is_admin de Buffer à boolean
      result[0].is_admin = result[0].is_admin[0] != 0; // Convertit de Buffer à boolean
      // Convertit le champ has_mail de Buffer à boolean

      result[0].has_mail = result[0].has_mail[0] != 0;

      // Retourne le premier objet du tableau (première ligne de résultats)
      return result[0];
    }

    return result;
  }

  async updateLastPickedUp(firm_name) {
    // Met à jour last_picked_up et has_mail
    const updateQuery = `
        UPDATE users 
        SET last_picked_up = CURRENT_TIMESTAMP,
            has_mail = b'0'
        WHERE firm_name = '${firm_name}'`;
    await this.executeQuery(updateQuery);

    // Retourner uniquement le firm_name
  }
}

export let controller = new Controller();
