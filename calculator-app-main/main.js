// DOM Elements
const stylesLinkEl = document.getElementById("theme-ss");
const themeTogglerEl = document.getElementById("theme-sw");
const theme1RadioEl = document.getElementById("theme1");
const theme2RadioEl = document.getElementById("theme2");
const theme3RadioEl = document.getElementById("theme3");

const calculatorControlsEl = document.getElementById("calc-controls");

// Global variables

// Theme variables
let userTheme = localStorage.getItem("userTheme");
let chosenTheme = null;

// Calculator variables
let currentValue = null;
let totalValue = null;


// Functions

// Theme functions

const checkPreferredTheme = () => {
  if (userTheme) {
    chosenTheme = +userTheme;
    return;
  }

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    chosenTheme = 0;
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    chosenTheme = 1;
  }
};

const setPreferredTheme = () => {
  if (chosenTheme === 0) {
    stylesLinkEl.href = "./styles/dark.css";
    theme1RadioEl.checked = true;
  } else if (chosenTheme === 1) {
    stylesLinkEl.href = "./styles/light.css";
    theme2RadioEl.checked = true;
  } else if (chosenTheme === 2) {
    stylesLinkEl.href = "./styles/violet.css";
    theme3RadioEl.checked = true;
  }
};

const switchTheme = (e) => {
  let target = e.target;

  if (target.classList.contains("theme-radio")) {
    if (target.id === "theme1") {
      localStorage.setItem("userTheme", "0");
      chosenTheme = 0;
      setPreferredTheme();
    } else if (target.id === "theme2") {
      localStorage.setItem("userTheme", "1");
      chosenTheme = 1;
      setPreferredTheme();
    } else if (target.id === "theme3") {
      localStorage.setItem("userTheme", "2");
      chosenTheme = 2;
      setPreferredTheme();
    }
  } else {
    return;
  }
};

// Calculator functions

//  ...

// Other functions

const animateBtns = (e) => {
  let target = e.target;

  if (target.classList.contains("btn")) {
    target.classList.remove("push-btn");
    void target.offsetWidth;
    target.classList.add("push-btn");
  } else {
    return;
  }
};

//Initial calls
checkPreferredTheme();
setPreferredTheme();

// Event listeners
calculatorControlsEl.addEventListener("submit", (e) => {
  e.preventDefault();
});

calculatorControlsEl.addEventListener("click", animateBtns);

themeTogglerEl.addEventListener("click", switchTheme);
