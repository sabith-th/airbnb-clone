interface Error {
  path: string;
  message: string;
}

export const normalizeErrors = (errors: Error[]) => {
  const errorMap: { [key: string]: string } = {};

  errors.forEach(error => {
    errorMap[error.path] = error.message;
  });

  return errorMap;
};
