import Joi = require('joi');

const shemaLogin: Joi.Schema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': 'All fields must be filled',
    /* 'string.email': 'O {{#label}} deve ter o formato "email@email.com"',
    'string.empty': SCHEMA, */
  }),
  password: Joi.string().required().messages({
    'any.required': 'All fields must be filled',
    /* 'string.email': 'O {{#label}} deve ter o formato "email@email.com"',
    'string.empty': SCHEMA, */
  }),
});

export default shemaLogin;
