// DOM Elements & variables

const hamburgerIconEl = document.getElementById('mob-ctrl-wrap');
const mobNavEl = document.getElementById('top-nav');

// Functions

function toggleMobileMenu() {
    hamburgerIconEl.classList.toggle('mob-active');
    mobNavEl.classList.toggle('active');
}


// Event listeners

hamburgerIconEl.addEventListener('click', toggleMobileMenu);