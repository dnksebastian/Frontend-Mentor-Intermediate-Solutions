// DOM Elements & variables

const hamburgerIconEl = document.getElementById("mob-ctrl-wrap");
const mobNavEl = document.getElementById("top-nav");

const shortenerFormEl = document.getElementById("shortener-form");
const shortenerInputEl = document.getElementById("shortener-input");
const shortenerErrMsgEl = document.querySelector(".err-msg");

const fullLinkEls = [...document.getElementsByClassName("full-link")];
const shortenedLinkEls = [...document.getElementsByClassName("shortened-link")];
const copyBtnEls = [...document.getElementsByClassName("copy-btn")];


let userURL;

// Functions

function toggleMobileMenu() {
  hamburgerIconEl.classList.toggle("mob-active");
  mobNavEl.classList.toggle("active");
}

function validateForm() {
  let inputIsValid = false;

  let userInput = shortenerInputEl.value.trim();

  if (!userInput) {
    shortenerInputEl.setCustomValidity("Please add a link");
    shortenerErrMsgEl.textContent = shortenerInputEl.validationMessage;
} else if (userInput && !isValidUrl(userInput)) {
    shortenerInputEl.setCustomValidity("Please enter valid URL");
    shortenerErrMsgEl.textContent = shortenerInputEl.validationMessage;
} else {
    shortenerInputEl.setCustomValidity("");
    shortenerErrMsgEl.textContent = shortenerInputEl.validationMessage;
    inputIsValid = true;
    userURL = userInput;
}
  return inputIsValid;
}

function isValidUrl(str) {
    try {
      new URL(str);
      return true;
    } catch (err) {
      return false;
    }
  }

async function callShortenerAPI() {
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${userURL}`)
    const data = await res.json();
    console.log(data);
}

function renderResult() {
    // ...
    console.log("results...");
}

function createResultElement(fullLink, shortLink) {
    const linkResultEl = document.createElement("li");
    const resultHelperEl = document.createElement("div");
    const resultHelperEl2 = document.createElement("div");
    const fullLinkEl = document.createElement("span");
    const shortLinkEl = document.createElement("span");
    const copyBtnEl = document.createElement("button");

    linkResultEl.classList.add('link-result');
    resultHelperEl.classList.add('result-helper');
    resultHelperEl2.classList.add('result-helper');
    fullLinkEl.classList.add('full-link');
    shortLinkEl.classList.add('shortened-link');
    copyBtnEl.classList.add('copy-btn');
    copyBtnEl.classList.add('btn-highlight');

    linkResultEl.appendChild(resultHelperEl);
    linkResultEl.appendChild(resultHelperEl2);
    linkResultEl.firstElementChild.appendChild(fullLinkEl);
    linkResultEl.lastElementChild.appendChild(shortLinkEl);
    linkResultEl.lastElementChild.appendChild(copyBtnEl);

    fullLinkEl.textContent = fullLink;
    shortLinkEl.textContent = shortLink;
    copyBtnEl.textContent = "Copy";

    // button and li should have uid - todo

    console.log(linkResultEl);
}

function submitForm(e) {
  e.preventDefault();

  let isValid = validateForm();

  if (isValid) {
    renderResult();
  } else {
    console.log('input invalid');
  }
}

// Event listeners

hamburgerIconEl.addEventListener("click", toggleMobileMenu);

shortenerFormEl.addEventListener("submit", submitForm);

shortenerInputEl.addEventListener('input', validateForm);
shortenerInputEl.addEventListener('focus', () => {
    shortenerInputEl.classList.add('itcd');
})