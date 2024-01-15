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

const SessionState = {
  NO_SESSION: 0,
  USER: 1,
  ADMIN: 2,
}

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

  async verify_session(firm_name, token) {
    let results = await this.executeQuery(`SELECT is_admin FROM users WHERE
      firm_name = '${firm_name}' AND
      token = '${token}' AND
      last_token_usage > SUBTIME(NOW(), "8:0")
    `);

    if (results[0] == undefined) {
      return SessionState.NO_SESSION;
    }

    return results[0].is_admin ? SessionState.ADMIN : SessionState.USER;
  }

  async authentificate(firm_name, password) {
    let results = await this.executeQuery(`SELECT password_hash FROM users WHERE firm_name = '${firm_name}'`);
    if (results[0] == undefined) {
      return null;
    }

    if (!await bcrypt.compare(password, results[0].password_hash)) {
      return null;
    }

    let token = Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString('base64');

    await this.executeQuery(`UPDATE users SET
      token = '${token}',
      last_token_usage = NOW()
      WHERE firm_name = '${firm_name}'
    `)

    return token;
  }

  async getAllUsers() {
    const query = "SELECT firm_name FROM users";
    let results = await this.executeQuery(query);

    // Vérifier si les résultats sont vides
    if (results.length === 0) {
      throw new Error("Aucun utilisateur trouvé");
    }

    // Extraire les valeurs de firm_name sans le libellé
    const firmNames = results.map((result) => result.firm_name);

    return firmNames;
  }

  async insertUser(
    firm_name,
    first_name,
    last_name,
    email,
    phone_number,
    password,
    has_mail,
    is_admin
  ) {
    let password_hash = await bcrypt.hash(password, 12);
    
    const query = `
        INSERT INTO users (
          firm_name,
          first_name,
          last_name,
          email,
          phone_number,
          password_hash,
          has_mail,
          is_admin
        )
        VALUES (
          '${firm_name}',
          '${first_name}',
          '${last_name}',
          '${email}',
          '${phone_number}',
          '${password_hash}',
          b'${has_mail ? 1 : 0}',
          b'${is_admin ? 1 : 0}'
        )
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
