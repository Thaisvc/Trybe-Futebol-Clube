import Joi = require('joi');

import HttpException from '../utils/http.exception';
import { mapError } from '../utils/erroMap';

export default function validation(schemaEstrutura: Joi.Schema, payload: object) {
  const { error, value } = schemaEstrutura.validate(payload);
  if (error) {
    throw new HttpException(mapError(error.message), error.message);
  }
  return value;
}
