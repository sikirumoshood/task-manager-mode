const validator = require("validator");
const isEmpty = require("../utils/is-empty");

module.exports = validateLoginInput = data => {
  data.name = isEmpty(data.name) ? "" : data.name;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  let emailIsEmpty = false;
  const errors = {};

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
    emailIsEmpty = true;
  }
  if (!emailIsEmpty) {
    if (!validator.isEmail(data.email)) {
      errors.email = "Email format is incorrect";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
