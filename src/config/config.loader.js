import dotenv from "dotenv";

import { configSchema } from "./config.schema.js";

const isProduction = () => process.env.NODE_ENV === "production";

export class ConfigService {
  static _config = {};

  static get(key) {
    return this._config[key];
  }
  static load() {
    console.log("isProduction", isProduction());
    if (!isProduction()) {
      dotenv.config();
    }
    console.log("process.env", process.env.PORT);
    const cofig = {
      port: process.env.PORT,
      db_user: process.env.DB_USER,
      db_password: process.env.DB_PASSWORD,
      db_host: process.env.DB_HOST,
      db_name: process.env.DB_NAME,
      db_port: process.env.DB_PORT,
    };

    const { error, value } = configSchema.validate(cofig);

    if (error) {
      throw new Error(`Config validation error: ${JSON.stringify(error)}`);
    }

    ConfigService._config = Object.freeze(value);
  }

  static getDbString() {
    const { db_user, db_pass, db_host, db_port, db_name } =
      ConfigService._config;

    // create a database connection string
    return `postgresql://${db_user}:${db_pass}@${db_host}:${db_port}/${db_name}`;
  }
}
