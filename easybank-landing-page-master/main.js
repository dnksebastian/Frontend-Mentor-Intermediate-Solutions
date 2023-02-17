// DOM Elements
const mobileMenuEl = document.getElementById('navwrap');
const mobileMenuIconEl = document.getElementById('mob-icon');
const backdropElement = document.getElementById('bdrop');

// Functions

const toggleMobileMenu = () => {
    mobileMenuEl.classList.toggle('menu-active');
    mobileMenuIconEl.classList.toggle('mobile-icon-active');
    backdropElement.classList.toggle('backdrop-visible');
};

// Event listeners

mobileMenuIconEl.addEventListener('click', toggleMobileMenu);