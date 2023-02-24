// DOM Elements & global variables

const mobileMenuIconEl = document.getElementById("mob-menu-wrap");
const mobileNavEl = document.getElementById("nav");
let menuActive = false;


const heroSlideEls = [... document.getElementsByClassName('hero-slide')];
const controlLeftEl = document.getElementById('control-left');
const controlRightEl = document.getElementById('control-right');

let slideI = 1;
changeSlide(slideI);

// Functions
const toggleMobileMenu = () => {
  mobileMenuIconEl.classList.toggle("icon-active");

  mobileNavEl.classList.toggle("menu-active");
  mobileNavEl.classList.remove("hide-menu");

  menuActive = !menuActive;

  if (menuActive === false) {
    mobileNavEl.classList.add("hide-menu");
  }
};

const showSlide = (n) => {
  changeSlide(slideI += n)
};

function changeSlide(slideNum) {
  if (slideNum > heroSlideEls.length) {slideI = 1}
  if (slideNum < 1) {slideI = heroSlideEls.length}
  
  for (let i = 0; i < heroSlideEls.length; i++) {
    heroSlideEls[i].classList.remove('slide-active');
  }

  heroSlideEls[slideI-1].classList.add('slide-active');
};


// Event listeners
mobileMenuIconEl.addEventListener("click", toggleMobileMenu);
controlLeftEl.addEventListener('click', showSlide.bind(null, -1));
controlRightEl.addEventListener('click', showSlide.bind(null, 1));
