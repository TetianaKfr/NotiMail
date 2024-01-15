import mysql from "mysql";
import bcrypt from "bcrypt";

import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  MYSQL_PORT,
} from "../environment.js";

export class PermissionException extends Error {
  constructor() {
    super("Unauthorized");
  }
}

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

    return results[0].is_admin[0] == 1 ? SessionState.ADMIN : SessionState.USER;
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
    session_firm_name,
    session_token,
    firm_name,
    first_name,
    last_name,
    email,
    phone_number,
    password,
    is_admin,
  ) {
    if (await this.verify_session(session_firm_name, session_token) != SessionState.ADMIN) {
      throw new PermissionException();
    }

    try {
      await this.executeQuery(`
      INSERT INTO users (
        firm_name,
        first_name,
        last_name,
        email,
        phone_number,
        password_hash,
        is_admin
      )
      VALUES (
        '${firm_name}',
        '${first_name}',
        '${last_name}',
        '${email}',
        '${phone_number}',
        '${await bcrypt.hash(password, 12)}',
        b'${is_admin ? 1 : 0}'
      )
    `);
    } catch (err) {
      if (err.code == "ER_DUP_ENTRY") {
        return false;
      }
      throw err;
    }

    return true;
  }

  async deleteUser(session_firm_name, session_token, firm_name) {
    if (await this.verify_session(session_firm_name, session_token) != SessionState.ADMIN) {
      throw new PermissionException();
    }

    return (await this.executeQuery(`DELETE FROM users WHERE firm_name = '${firm_name}'`)).affectedRows > 0;
  }

  async updateUser(
    session_firm_name,
    session_token,
    firm_name,
    first_name,
    last_name,
    email,
    phone_number,
    password,
    has_mail,
    is_admin
  ) {
    let session_state = await this.verify_session(session_firm_name, session_token)
    if (session_state == SessionState.NO_SESSION) {
      throw new PermissionException();
    }

    let require_admin = false;

    let updated_fields = [];

    if (firm_name != undefined) {
      updated_fields.push(`firm_name = '${firm_name}'`);
      require_admin = true;
    }
    if (first_name != undefined) {
      updated_fields.push(`first_name = '${first_name}'`);
      require_admin = true;
    }
    if (last_name != undefined) {
      updated_fields.push(`last_name = '${last_name}'`);
      require_admin = true;
    }
    if (email != undefined) {
      updated_fields.push(`email = '${email}'`);
      require_admin = true;
    }
    if (phone_number != undefined) {
      updated_fields.push(`phone_number = '${phone_number}'`);
      require_admin = true;
    }
    if (password != undefined) {
      updated_fields.push(`password_hash = '${await bcrypt.hash(password, 12)}'`);
      require_admin = true;
    }
    if (has_mail != undefined) {
      updated_fields.push(`has_mail = b'${has_mail ? 1 : 0}'`);
      if (has_mail) {
        updated_fields.push(`last_received_mail = NOW()`);
      } else {
        updated_fields.push(`last_picked_up = NOW()`);
      }
    }
    if (is_admin != undefined) {
      updated_fields.push(`is_admin = b'${is_admin ? 1 : 0}'`);
      require_admin = true;
    }

    if (require_admin && session_state != SessionState.ADMIN) {
      throw new PermissionException();
    }

    let result = await this.executeQuery(`
      UPDATE users SET 
      ${updated_fields.join(",")}
      WHERE firm_name = '${firm_name}'
    `);

    return result.affectedRows > 0;
  }

  async getUser(session_firm_name, session_token, firm_name) {
    let session_state = await this.verify_session(session_firm_name, session_token);
    if (session_state == SessionState.NO_SESSION || (session_state == SessionState.USER && firm_name != session_firm_name)) {
      throw new PermissionException();
    }

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
