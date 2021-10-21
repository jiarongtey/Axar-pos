const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateNewProductInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.brand = !isEmpty(data.brand) ? data.brand : "";

  data.resell = !isEmpty(data.resell) ? data.resell : "";
  data.cost = !isEmpty(data.cost) ? data.cost : "";
  data.quantity = !isEmpty(data.quantity) ? data.quantity : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Category checks
  if (Validator.isEmpty(data.category)) {
    errors.category = "Category field is required";
  }

  // Brand checks
  if (Validator.isEmpty(data.brand)) {
    errors.brand = "Brand field is required";
  }

  // Resell checks
  if (Validator.isEmpty(data.resell)) {
    errors.resell = "Resell field is required";
  } else if (!Validator.isNumeric(data.resell)) {
    errors.resell = "Resell price is invalid, must be number.";
  }
  // Cost checks
  if (Validator.isEmpty(data.cost)) {
    errors.cost = "Cost field is required";
  } else if (!Validator.isNumeric(data.cost)) {
    errors.cost = "Cost price is invalid, must be number.";
  }
  // Quantity checks
  if (Validator.isEmpty(data.quantity)) {
    errors.quantity = "Quantity field is required";
  } else if (!Validator.isNumeric(data.quantity)) {
    errors.quantity = "Quantity is invalid, must be number.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
