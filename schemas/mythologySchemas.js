import Joi from 'joi';

export const mythologySchema = Joi.object({
  mythology_name: Joi.string().required(),
});
