import { validate } from "express-validation";
import Joi from "joi";

const upload = validate(
  {
    headers: Joi.object({
      "file-name": Joi.string().required(),
    }),
  },
  { keyByField: true }
);

export default { upload };
