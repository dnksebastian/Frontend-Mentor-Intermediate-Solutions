// DOM Elements
const mobileMenuControlEl = document.getElementById('mobile-menu-control')
const backdropEl = document.getElementById('backdrop')
const topNavEl = document.getElementById('top-nav')
const topLogoEl = document.getElementById('top-logo')
const closeMenuIcon = document.getElementById('close-menu-icon')
const hamburgerIcon = document.getElementById('hamburger-icon')
const bodyEl = document.body

// Functions

const toggleMobileMenu = () => {
    backdropEl.classList.toggle('active')
    topNavEl.classList.toggle('active')
    topLogoEl.classList.toggle('active')
    hamburgerIcon.classList.toggle('active')
    closeMenuIcon.classList.toggle('active')
    bodyEl.classList.toggle('mob-menu-active')
}

// Event listeners

mobileMenuControlEl.addEventListener('click', toggleMobileMenu)