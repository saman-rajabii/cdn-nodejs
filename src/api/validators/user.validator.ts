import { validate } from "express-validation";
import Joi from "joi";

const signin = validate(
  {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().alphanum().min(8).required(),
    }),
  },
  { keyByField: true }
);

const signup = validate(
  {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().alphanum().min(8).required(),
    }),
  },
  { keyByField: true }
);

export default { signin, signup };
