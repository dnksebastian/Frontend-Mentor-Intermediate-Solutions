// DOM Elements
// Style elements
const stylesLinkEl = document.getElementById("theme-ss");
const themeTogglerEl = document.getElementById("theme-sw");
const theme1RadioEl = document.getElementById("theme1");
const theme2RadioEl = document.getElementById("theme2");
const theme3RadioEl = document.getElementById("theme3");

// Calculator elements
const resetEl = document.querySelector('[data-val="reset"]');
const delEl = document.querySelector('[data-val="del"]');
const equalsEl = document.querySelector('[data-val="="]');

const totalValEl = document.getElementById("total-value");
const currentValEl = document.getElementById("current-value");

const calculatorControlsEl = document.getElementById("calc-controls");

// Global variables

// Theme variables
let userTheme = localStorage.getItem("userTheme");
let chosenTheme = null;

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

// Calculator Variables
let currentVal = "";
let previousVal = "";
let resultVal = "";
let currentOperation = "";
let prevOperation = "";

// Calculator functions

const setCurrentVal = (e) => {
  target = e.target;

  if (target.classList.contains("num")) {
    let btnVal = target.dataset.val.toString();

    if (btnVal === "." && currentVal.includes(".")) {
      return;
    }

    currentVal = currentVal + btnVal;
    currentValEl.textContent = currentVal;
  }
};

const setOperationSymbol = (e) => {
  target = e.target;

  if (target.classList.contains("sign")) {
    currentOperation = target.dataset.val.toString();
  }
};

const calculate = (operation) => {
  let current = parseFloat(currentVal);
  let previous = parseFloat(previousVal);

  switch (operation) {
    case "*":
      resultVal = +(previous * current).toPrecision(4);
      break;

    case "/":
      resultVal = +(previous / current).toPrecision(4);
      break;

    case "+":
      resultVal = +(previous + current).toPrecision(4);
      break;

    case "-":
      resultVal = +(previous - current).toPrecision(4);
      break;

    default:
      return;
  }
};

const getResult = (e) => {
  target = e.target;

  if (target.classList.contains("sign")) {
    if (currentVal && !previousVal) {
      previousVal = currentVal;
      prevOperation = currentOperation;
      totalValEl.textContent = `${previousVal}${prevOperation}`;
      currReset();
      return;
    } else if (currentVal && previousVal) {
      calculate(prevOperation);
      currReset();
      prevOperation = currentOperation;
      previousVal = resultVal;
      totalValEl.textContent = `${resultVal}${currentOperation}`;
    } else if (resultVal && !currentVal) {
      previousVal = resultVal;
      prevOperation = currentOperation;
      totalValEl.textContent = `${previousVal}${prevOperation}`;
      currReset();
    } else {
      return;
    }
  }

  if (target.classList.contains("eq")) {
    if (resultVal && !currentVal) {
      return;
    }

    calculate(prevOperation);
    currentValEl.textContent = `${resultVal}`;
    currentVal = "";
    previousVal = "";
    currentOperation = "";
    prevOperation = "";
    totalValEl.textContent = "";
  }
};

const reset = () => {
  currentVal = "";
  previousVal = "";
  resultVal = "";
  currentOperation = "";
  prevOperation = "";
  currentValEl.textContent = "";
  totalValEl.textContent = "";
};

const currReset = () => {
  currentValEl.textContent = "";
  currentVal = "";
};

const deleteInput = () => {
  currentVal = currentVal.slice(0, -1);
  currentValEl.textContent = currentVal;
};

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
themeTogglerEl.addEventListener("click", switchTheme);
calculatorControlsEl.addEventListener("click", animateBtns);

calculatorControlsEl.addEventListener("submit", (e) => {
  e.preventDefault();
});

calculatorControlsEl.addEventListener("click", setCurrentVal);
calculatorControlsEl.addEventListener("click", setOperationSymbol);
calculatorControlsEl.addEventListener("click", getResult);

resetEl.addEventListener("click", reset);
delEl.addEventListener("click", deleteInput);

