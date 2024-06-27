import pg from "pg";
import { ConfigService } from "../config/config.loader.js";
const { Pool } = pg;

let db;

export const getDatabase = () => {
  if (!db) {
    db = new Pool({
      connectionString: ConfigService.getDbString(),
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  return db;
};

export const closeDataBase = async () => {
  try {
    await db?.end();
    console.log("database connection closed");
  } catch (error) {
    console.log(`failed to closed connection: ${error}`);
  }
};

export const pingDatabase = async (db) => {
  await db.query("SELECT NOW() as now");
};
