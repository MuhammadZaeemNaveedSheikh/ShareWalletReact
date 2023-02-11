const APIError = require('./apiError');

const precision = 2;

module.exports.roundCurrency = input => {
  if (isNaN(input)) {
    throw new APIError('Input must be a number.', 400);
  }
  const amount = Number(input);
  const formatted = amount.toFixed(precision);
  if (amount.toFixed(precision + 1) !== formatted + '0') {
    throw new APIError('Precision is not supported.', 400);
  }
  return Number(formatted);
};
