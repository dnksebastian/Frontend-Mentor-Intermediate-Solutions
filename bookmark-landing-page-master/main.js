// DOM Elements
const mobileMenuControlEl = document.getElementById('mobile-menu-control')
const backdropEl = document.getElementById('backdrop')
const topNavEl = document.getElementById('top-nav')
const topLogoEl = document.getElementById('top-logo')
const closeMenuIcon = document.getElementById('close-menu-icon')
const hamburgerIcon = document.getElementById('hamburger-icon')



const formElement = document.getElementById('contact-form');
// Functions

const toggleMobileMenu = () => {
    backdropEl.classList.toggle('active')
    topNavEl.classList.toggle('active')
    topLogoEl.classList.toggle('active')
    hamburgerIcon.classList.toggle('active')
    closeMenuIcon.classList.toggle('active')
}

const submitForm = (e) => {
    e.preventDefault()
    console.log('form submitted');
}


// Event listeners

mobileMenuControlEl.addEventListener('click', toggleMobileMenu)
formElement.addEventListener('submit', submitForm)