import Joi from "joi";

export const profileEditReqSchema = Joi.object({
  firstname: Joi.string()
    .max(100)
    .pattern(/[a-zA-Z]+/)
    .optional(),
  lastname: Joi.string()
    .max(100)
    .pattern(/[a-zA-Z]+/)
    .optional(),
  bio: Joi.string().max(500).optional(),
  // phonenumber: Joi.string().optional(),
  // birthdate: Joi.date().iso().optional(),
}).min(1);
