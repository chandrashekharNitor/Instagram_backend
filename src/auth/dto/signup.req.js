import Joi from "joi";

export const signupReqSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-zA-Z0-9]).{8,}$/)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "in"] },
    })
    .required(),
});
