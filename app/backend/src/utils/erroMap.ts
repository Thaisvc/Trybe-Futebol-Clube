const errorMap = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
};

const mapError = (errorMessage: string): number => {
  if (errorMessage.includes('required')) return errorMap.badRequest;
  if (errorMessage.includes('must')) return errorMap.unauthorized;
  return errorMap.unauthorized;
};

export { errorMap, mapError };
