export const validateRequired = (values, requiredKeys) => {
  const errors = {};
  requiredKeys.forEach((key) => {
    errors[key] = !values[key];
  });
  return errors;
};

export const hasErrors = (errorsObj) => Object.values(errorsObj).some(Boolean);

export const isValidEmail = (value) => {
  if (!value) return false;
  // Simple email regex for basic validation
  return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);
};
