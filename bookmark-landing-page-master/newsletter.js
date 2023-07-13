// DOM Elements

const emailInputEl = document.getElementById('email')
const errorMessageEl = document.getElementById('error-msg')
const mailFormEl = document.getElementById('contact-form')

// Functions

const checkIfFocusedAndValid = () => {
    let isFocused = document.activeElement === emailInputEl
    let isValid = emailInputEl.checkValidity()

    if (isFocused) {
        mailFormEl.classList.add('form-focused')
        mailFormEl.classList.remove('form-not-focused')
    }
    else {
        mailFormEl.classList.add('form-not-focused')
        mailFormEl.classList.remove('form-focused')
    }

    if(isValid) {
        mailFormEl.classList.add('form-valid')
        mailFormEl.classList.remove('form-invalid')
    } else {
        mailFormEl.classList.add('form-invalid')
        mailFormEl.classList.remove('form-valid')
    }
}

const validateForm = () => {
    checkIfFocusedAndValid()
    if (emailInputEl.validity.valueMissing) {
      errorMessageEl.textContent = "Please enter your email";
      mailFormEl.classList.add('form-invalid')
      return false;
    } else if (emailInputEl.validity.typeMismatch) {
        errorMessageEl.textContent = "Whoops, make sure it's an email";
        mailFormEl.classList.add('form-invalid')
        return false;
    } else if (emailInputEl.validity.valid) {
        errorMessageEl.textContent = "";
        mailFormEl.classList.add('form-valid')
      return true;
    }
  };
  
  const submitForm = (e) => {
    e.preventDefault();
  
    let isValid = validateForm();
  
    if (isValid) {
      console.log("submitted");
      mailFormEl.reset();
      mailFormEl.classList.remove("interacted");
      mailFormEl.classList.remove("form-invalid");
      mailFormEl.classList.remove("form-valid");
    } else {
      console.log("not submitted");
      mailFormEl.classList.add("interacted");
    }
  };


// Event listeners

mailFormEl.addEventListener("submit", submitForm);

emailInputEl.addEventListener("input", validateForm);
emailInputEl.addEventListener("blur", validateForm);

mailFormEl.addEventListener("click", () => {
  validateForm()
  mailFormEl.classList.add("interacted");
});