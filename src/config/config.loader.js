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
      jwt_secret: process.env.JWT_SECRET,
      jwt_expiration: process.env.JWT_EXPIRATION,
    };

    const { error, value } = configSchema.validate(cofig);

    if (error) {
      throw new Error(`Config validation error: ${JSON.stringify(error)}`);
    }

    ConfigService._config = Object.freeze(value);
  }

  static getDbString() {
    let { db_user, db_password, db_host, db_port, db_name } =
      ConfigService._config;

    db_user = encodeURIComponent(db_user);
    db_password = encodeURIComponent(db_password);
    db_name = encodeURIComponent(db_name);

    const query = new URLSearchParams({
      sslmode: process.env.NODE_ENV === "production" ? "require" : "disable",
    }).toString();

    // create a database connection string
    return `postgres://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}?${query}`;
  }
}
