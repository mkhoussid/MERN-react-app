const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //Check if email field is valid
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email invalid";
  }

  //Check if email field is empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  //Check if password is empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
