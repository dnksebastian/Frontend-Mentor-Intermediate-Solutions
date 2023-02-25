// DOM Elements & global variables

const mobileMenuIconEl = document.getElementById("mob-menu-wrap");
const mobileNavEl = document.getElementById("nav");
const backdropEl = document.getElementById('backdrop');
let menuActive = false;


const heroSlideEls = [... document.getElementsByClassName('hero-slide')];
const controlLeftEl = document.getElementById('control-left');
const controlRightEl = document.getElementById('control-right');

let slideI = 1;
changeSlide(slideI);


let intervalID
intervalID = setInterval(showSlide, 5000, 1);

// Functions
const toggleMobileMenu = () => {
  mobileMenuIconEl.classList.toggle("icon-active");

  mobileNavEl.classList.toggle("menu-active");
  mobileNavEl.classList.remove("hide-menu");

  backdropEl.classList.toggle('backdrop-active');

  menuActive = !menuActive;

  if (menuActive === false) {
    mobileNavEl.classList.add("hide-menu");
  }
};



function changeSlide(slideNum) {
  if (slideNum > heroSlideEls.length) {slideI = 1}
  if (slideNum < 1) {slideI = heroSlideEls.length}
  
  for (let i = 0; i < heroSlideEls.length; i++) {
    heroSlideEls[i].classList.remove('slide-active');
  }

  heroSlideEls[slideI-1].classList.add('slide-active');
};


function showSlide(n) {
  changeSlide(slideI += n);
  clearInterval(intervalID);
  intervalID = setInterval(showSlide, 5000, 1);
};


// Event listeners
mobileMenuIconEl.addEventListener("click", toggleMobileMenu);
controlLeftEl.addEventListener('click', showSlide.bind(null, -1));
controlRightEl.addEventListener('click', showSlide.bind(null, 1));
