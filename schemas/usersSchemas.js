import Joi from 'joi';

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
