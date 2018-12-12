const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  //Check if school field is empty
  if (Validator.isEmpty(data.school)) {
    errors.school = "School field is required";
  }

  //Check if degree field is empty
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }

  //Check if fieldOfStudy field is empty
  if (Validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Field of Study is required";
  }

  //Check if from field is empty
  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
