// DOM Elements
const faqEls = document.querySelectorAll(".faq-qa");
// const faqIconEls = document.querySelectorAll(".qa-icon");
// const faqAnswerEls = document.querySelectorAll(".qa-answer");
// const faqAnswerPEls = document.querySelectorAll(".answer-p");

// Functions

const hideElement = (el) => {
  el.classList.remove("faq-active");
  el.classList.add("faq-inactive")
};
const toggleElement = (el) => {
  el.classList.toggle("faq-active");
  el.classList.toggle("faq-inactive")
};

const showChosenAnswer = (e) => {
  const clickedFAQ = e.target.closest(".faq-qa");
  faqEls.forEach((el) => {
    if (el !== clickedFAQ) {
      hideElement(el);
    }
  });
  toggleElement(clickedFAQ);
};

// Event listeners

faqEls.forEach((el) => {
  el.addEventListener("click", showChosenAnswer);
});
