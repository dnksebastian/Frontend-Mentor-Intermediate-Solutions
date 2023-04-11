// DOM Elements & variables

const hamburgerIconEl = document.getElementById("mob-ctrl-wrap");
const mobNavEl = document.getElementById("top-nav");

const shortenerFormEl = document.getElementById("shortener-form");
const shortenerInputEl = document.getElementById("shortener-input");
const shortenerErrMsgEl = document.querySelector(".err-msg");

const shortenedLinksList = document.getElementById('shortened-links-list');

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
  try {
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${userURL}`);
    if (!res.ok) {
      throw new Error("Response failed");
    }
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

 function renderResult(element) {
   shortenedLinksList.appendChild(element);
}

function createResultElement(fullLink, shortLink, linkCode) {
  const linkResultEl = document.createElement("li");
  const resultHelperEl = document.createElement("div");
  const resultHelperEl2 = document.createElement("div");
  const fullLinkEl = document.createElement("span");
  const shortLinkEl = document.createElement("span");
  const copyBtnEl = document.createElement("button");

  linkResultEl.classList.add("link-result");
  resultHelperEl.classList.add("result-helper");
  resultHelperEl2.classList.add("result-helper");
  fullLinkEl.classList.add("full-link");
  shortLinkEl.classList.add("shortened-link");
  copyBtnEl.classList.add("copy-btn");
  copyBtnEl.classList.add("btn-highlight");

  linkResultEl.appendChild(resultHelperEl);
  linkResultEl.appendChild(resultHelperEl2);
  linkResultEl.firstElementChild.appendChild(fullLinkEl);
  linkResultEl.lastElementChild.appendChild(shortLinkEl);
  linkResultEl.lastElementChild.appendChild(copyBtnEl);

  fullLinkEl.textContent = fullLink;
  shortLinkEl.textContent = shortLink;
  copyBtnEl.textContent = "Copy";

  linkResultEl.id = `el-${linkCode}`
  copyBtnEl.id = `btn-${linkCode}`

  return linkResultEl;
}

async function submitForm(e) {
  e.preventDefault();

  let isValid = validateForm();

  if (isValid) {
    let res = await callShortenerAPI();
    // renderResult();
    // console.log(res.result);
    let createdEl = createResultElement(userURL, res.result.full_short_link, res.result.code);
    // console.log(createdEl);
    renderResult(createdEl);

  } else {
    console.log("input invalid");
  }
}

// Event listeners

hamburgerIconEl.addEventListener("click", toggleMobileMenu);

shortenerFormEl.addEventListener("submit", submitForm);

shortenerInputEl.addEventListener("input", validateForm);
shortenerInputEl.addEventListener("focus", () => {
  shortenerInputEl.classList.add("itcd");
});
