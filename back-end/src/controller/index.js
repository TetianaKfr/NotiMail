import mysql from "mysql";
import bcrypt from "bcrypt";

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
    let initialization_query = `
      CREATE TABLE IF NOT EXISTS users (
        firm_name varchar(120) NOT NULL,
        first_name varchar(50) DEFAULT NULL,
        last_name varchar(50) DEFAULT NULL,
        email varchar(320) NOT NULL,
        phone_number varchar(25) NOT NULL,
        password_hash varchar(72) NOT NULL,
        last_received_mail timestamp NULL DEFAULT NULL,
        last_picked_up timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        has_mail bit(1) NOT NULL DEFAULT b'0',
        is_admin bit(1) NOT NULL DEFAULT b'0',
        token char(64) NULL DEFAULT NULL,
        last_token_usage timestamp NULL DEFAULT NULL,
        PRIMARY KEY (firm_name)
      );`;
    this.#connection.query(initialization_query, (err, _results) => {
      if (err) {
        console.error(
          "Failed to setup database '" + DATABASE_NAME + "': " + err.stack
        );
      } else {
        console.log("Database '" + DATABASE_NAME + "' initialized");
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

  async authentificate(firm_name, password) {
    let results = await this.executeQuery(`SELECT password_hash FROM users WHERE firm_name = '${firm_name}'`);
    if (results[0] == undefined) {
      return null;
    }

    if (!await bcrypt.compare(password, results[0].password_hash)) {
      return null;
    }

    let token = crypto.getRandomValues(new Uint8Array(32)).toString('base64');
  
    await this.executeQuery(`UPDATE users SET
      token = '${token}',
      last_token_usage = NOW(),
      WHERE firm_name = '${firm_name}'
    `)

    return token;
  }

  async getAllUsers() {
    try {
      const query = "SELECT * FROM users";
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

      return users;
    } catch (error) {
      // Logguer l'erreur pour le suivi
      console.error(
        "Error lors de la récupération des utilisateurs :",
        error.message
      );
      res
        .status(500)
        .send("Erreur lors de la récupération des données de l'utilisateur");
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
        VALUES ('${firm_name}', '${first_name}', '${last_name}', '${email}', '${phone_number}', '${password}', '${last_received_mail}', '${last_picked_up}', b'${has_mail}', b'${is_admin}')
      `;

      await this.executeQuery(query);
    } catch (error) {
      res.status(500).send("Echec de l'insertion de l'utilisateur.");
    }
  }

  async deleteUser(firm_name) {
    try {
      const query = `DELETE FROM users WHERE firm_name = '${firm_name}'`;
      await this.executeQuery(query);
    } catch (error) {
      res.status(500).send("Echec de la suppression de l'utilisateur.");
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
      // last_received_mail = ${
      //   new_has_mail ? `'${new_last_received_mail}'` : "NULL"
      // },
      // Met à jour la dernière réception de courrier, ou NULL si has_mail est faux
      /*
      last_picked_up = ${new_has_mail ? "NULL" : `'${new_last_picked_up}'`}, 
      */
      // Met à jour la dernière récupération de courrier, ou NULL si has_mail est vrai
      /*
      has_mail = '${new_has_mail ? 1 : 0}',
      */
      // Met à jour l'état du courrier en fonction de new_has_mail
      const query = `
    UPDATE users 
    SET 
    first_name = '${new_first_name}', 
    last_name = '${new_last_name}', 
    email = '${new_email}', 
    phone_number = '${new_phone_number}',
    password = '${new_password}', 
    last_received_mail = ${
      new_has_mail ? `'${new_last_received_mail}'` : "NULL"
    }, 
    last_picked_up = ${new_has_mail ? "NULL" : `'${new_last_picked_up}'`}, 
    has_mail = '${new_has_mail ? 1 : 0}', 
    is_admin = '${new_is_admin}'
    WHERE firm_name = '${new_firm_name}'`;

      console.log(query);
      await this.executeQuery(query);
    } catch (error) {
      res.status(500).send("Echec de la mise à jour de l'utilisateur.");
    }
  }

  async getUserByFirmName(firm_name) {
    try {
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
    } catch (error) {
      console.error(
        "Error lors de la récupérationde l'utilisateur par nom de société :",
        error.message
      );
      res
        .status(500)
        .send(
          "Error lors de la récupérationde l'utilisateur par nom de société :"
        );
    }
  }

  async updateLastPickedUp(firm_name) {
    try {
      // Met à jour last_picked_up et has_mail
      const updateQuery = `
        UPDATE users 
        SET last_picked_up = CURRENT_TIMESTAMP,
            has_mail = b'0'
        WHERE firm_name = '${firm_name}'`;
      await this.executeQuery(updateQuery);

      // Retourner uniquement le firm_name
    } catch (error) {
      console.error(
        "Error lors de la mise à jour la dernière récupération de l'utilisateur :",
        error.message
      );
      res
        .status(500)
        .send(
          "Error lors de la mise à jour la dernière récupération de l'utilisateur :"
        );
    }
  }
}

export let controller = new Controller();

// async LastMessage() {
//   try {
//     const query = "SELECT * FROM users ORDER BY last_picked_up DESC LIMIT 1";
//     let results = await this.executeQuery(query);

//     // Vérifier si les résultats sont vides
//     if (results.length === 0) {
//       throw new Error("Aucun utilisateur trouvé");
//     }

//     const users = results.map(
//       (result) =>
//         new Users(
//           result.firm_name,
//           result.first_name,
//           result.last_name,
//           result.email,
//           result.phone_number,
//           result.password,
//           result.last_received_mail,
//           result.last_picked_up,
//           result.has_mail[0] != 0,
//           result.is_admin[0] != 0
//         )
//     );

//     return users;
//   } catch (error) {
//     // Logguer l'erreur pour le suivi
//     console.error(
//       "Error lors de la récupération du dernier utilisateur :",
//       error.message
//     );
//     res
//       .status(500)
//       .send("Error lors de la récupération du dernier utilisateur :");
//   }
// }
