import Joi from 'joi';
import { statusList } from '../helpers/user-constants.js';

export const userSignUpSchema = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().min(1).required(),
  email: Joi.string().min(1).required().email({
    minDomainSegments: 2,
  }),
  token: Joi.string(),
});

export const userSignInSchema = Joi.object({
  password: Joi.string().min(1).required(),
  email: Joi.string().min(1).required().email({
    minDomainSegments: 2,
  }),
});
