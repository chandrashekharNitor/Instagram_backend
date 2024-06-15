import { config as loadConfig } from "dotenv";
import {
  ConfigSchema,
  ApplicationConfig,
  ApplicationConfigKey,
} from "./config.types";

export class ConfigService {
  private static config: ApplicationConfig;

  static load() {
    //TODO: load environemnt variables from .env
    if (process.env.NODE_ENV !== "production") {
      loadConfig();
    }

    const _: Record<string, any> = {
      port: process.env.PORT,
      db_user: process.env.DB_USER,
      db_pass: process.env.DB_PASSWORD,
      db_host: process.env.DB_HOST,
      db_name: process.env.DB_NAME,
      db_port: process.env.DB_PORT,
      env: process.env.NODE_ENV || "development",
    };

    const validatedConfig = ConfigSchema.safeParse(_);

    if (!validatedConfig.success) {
      throw new Error(
        `invalid application config: ${JSON.stringify(
          validatedConfig.error,
          null,
          2
        )}`
      );
    }

    ConfigService.config = validatedConfig.data;

    console.log("application config successfully loaded.");
  }

  static get<T>(key: ApplicationConfigKey): T {
    return ConfigService.config[key] as T;
  }
}
