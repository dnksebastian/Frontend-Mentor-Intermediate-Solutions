// DOM Elements & global variables
const mobileMenuIconEl = document.getElementById("mob-menu-wrap");
const mobileNavEl = document.getElementById("nav");

let menuActive = false;

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

// Event listeners
mobileMenuIconEl.addEventListener("click", toggleMobileMenu);
