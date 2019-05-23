const validator = require("validator");
const isEmpty = require("../utils/is-empty");

module.exports = validateRegisterInput = data => {
  data.name = isEmpty(data.name) ? "" : data.name;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.password2 = isEmpty(data.password2) ? "" : data.password2;

  let emailIsEmpty = false;
  let pwdIsEmpty = false;
  let errors = {};
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
    emailIsEmpty = true;
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Password2 field is required";
    pwdIsEmpty = true;
  }
  if (!pwdIsEmpty) {
    if (!validator.equals(data.password, data.password2)) {
      errors.password2 = "Passwords do not match";
    }
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
