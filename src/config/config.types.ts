import { z } from "zod";

export const Environement = z.enum(["development", "production", "test"]);

export const ConfigSchema = z.object({
  port: z.coerce.number().positive().min(0).max(65535),

  db_user: z.string().min(1),
  db_pass: z.string().min(1),
  db_host: z.string().min(1),
  db_name: z.string().min(1),
  db_port: z.coerce.number().positive().min(0).max(65535),
  env: Environement,
});

export type ApplicationConfig = z.infer<typeof ConfigSchema>;

export type ApplicationConfigKey = keyof ApplicationConfig;
