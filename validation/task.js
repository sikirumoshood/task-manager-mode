const validator = require("validator");
const isEmpty = require("../utils/is-empty");

module.exports = validateTaskInput = data => {
  data.title = isEmpty(data.title) ? "" : data.title;
  data.description = isEmpty(data.description) ? "" : data.description;
  data.deadlineDate = isEmpty(data.deadlineDate) ? "" : data.deadlineDate;

  const errors = {};

  if (validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
  if (validator.isEmpty(data.description)) {
    errors.description = "description field is required";
  }
  if (validator.isEmpty(data.deadlineDate)) {
    errors.deadlineDate = "Deadline date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
