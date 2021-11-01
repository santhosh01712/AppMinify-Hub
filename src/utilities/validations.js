//This module handles all the form field validations

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePasswordLength = (password) => {
  return password.length < 9;
};

const validatePassword = (password) => {
  const re = /\d/;
  return re.test(password);
};

export const validations = (username, password) => {
  let validInputs = true;
  let errorMessage = "";
  if (username.length === 0) {
    errorMessage = "Please fill Username field";
    validInputs = false;
  } else if (password.length === 0) {
    errorMessage = "Please fill Password field";
    validInputs = false;
  } else if (!validateEmail(username)) {
    errorMessage = "Enter a valid User Name";
    validInputs = false;
  } else if (validatePasswordLength(password)) {
    errorMessage = "Password should contain minimum of 9 characters";
    validInputs = false;
  } else if (!validatePassword(password)) {
    errorMessage = "Password should contain atleast one number";
    validInputs = false;
  }
  return [validInputs, errorMessage];
};
