import mysql from "mysql";
import bcrypt from "bcrypt";

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
      this.#connection.query(query, function(error, results, fields) {
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

  async listUsers() {
    let results = await this.executeQuery("SELECT firm_name FROM users");

    return results.map(
      (result) => {
        return result.firm_name;
      }
    );
  }

  async createUser(
    firm_name,
    first_name,
    last_name,
    email,
    phone_number,
    password,
    has_mail,
    is_admin,
  ) {
    let password_hash = await bcrypt.hash(password, 12);

    await this.executeQuery(`
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
    `);
  }

  async deleteUser(firm_name) {
    return (await this.executeQuery(`DELETE FROM users WHERE firm_name = '${firm_name}'`)).affectedRows > 0;
  }

  async updateUser(
    firm_name,
    first_name,
    last_name,
    email,
    phone_number,
    password,
    has_mail,
    is_admin
  ) {
    let updated_fields = [];

    if (firm_name != undefined) {
      updated_fields.push(`firm_name = '${firm_name}'`);
    }
    if (first_name != undefined) {
      updated_fields.push(`first_name = '${first_name}'`);
    }
    if (last_name != undefined) {
      updated_fields.push(`last_name = '${last_name}'`);
    }
    if (email != undefined) {
      updated_fields.push(`email = '${email}'`);
    }
    if (phone_number != undefined) {
      updated_fields.push(`phone_number = '${phone_number}'`);
    }
    if (password != undefined) {
      updated_fields.push(`password_hash = '${await bcrypt.hash(password, 12)}'`);
    }
    if (has_mail != undefined) {
      updated_fields.push(`has_mail = '${has_mail ? 1 : 0}'`);
      if (has_mail) {
        updated_fields.push(`last_received_mail = NOW()`);
      } else {
        updated_fields.push(`last_picked_up = NOW()`);
      }
    }
    if (is_admin != undefined) {
      updated_fields.push(`is_admin = '${is_admin}'`);
    }

    await this.executeQuery(`
      UPDATE users SET 
      ${updated_fields.join(",")}
      WHERE firm_name = '${firm_name}'
    `);
  }

  async getUser(firm_name) {
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
    let user = (await this.executeQuery(query))[0];
    if (user == undefined) {
      return null;
    }

    user.has_mail = user.has_mail[0] != 0;
    user.is_admin = user.is_admin[0] != 0;

    return user;
  }
}

export default new Controller();
