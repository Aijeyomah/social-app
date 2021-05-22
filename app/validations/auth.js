import Joi from '@hapi/joi';
import { stringCheck } from './generic';

export const loginSchema = Joi.object({
  email: stringCheck(Joi, 'email', 2, 50),
  password: stringCheck(Joi, 'password', 8, 50),
});

// export const signUpSchema = Joi.object({
//   first_name,
//   last_name,
//   username,
//   email,
//   phone_number,
//   password,
// });



