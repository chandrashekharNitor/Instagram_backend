import Joi from "joi";

export const configSchema = Joi.object({
  port: Joi.number().integer().greater(5).less(65535).required(),
  db_port: Joi.number().integer().greater(5).less(65535).required(),
  db_password: Joi.string().required(),
  db_host: Joi.string().required(),
  db_user: Joi.string().required(),
  db_name: Joi.string().required(),
});
