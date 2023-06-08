// DOM Elements & variables
const mobileMenuIconEl = document.getElementById("mob-menu-wrap");
const mobileMenuEl = document.getElementById("top-nav");
const iconOpen = document.getElementById("hamburger-open");
const iconClose = document.getElementById("hamburger-close");
const backdropEl = document.getElementById('backdrop')
const menuLinksEls = document.querySelectorAll('.nav-a');

// Functions
const toggleMobileMenu = () => {
  mobileMenuIconEl.classList.toggle("active");
  mobileMenuEl.classList.toggle("show");
  document.querySelector('body').classList.toggle('backdrop-open')
  
  if (mobileMenuEl.classList.contains("show")) {
    mobileMenuEl.style.display = "flex";
    backdropEl.style.display = 'block'
  } else {
    setTimeout(() => {
      mobileMenuEl.style.display = "none";
      backdropEl.style.display = 'none';
    }, 550);
  }

  mobileMenuEl.classList.toggle("hidden");
  mobileMenuEl.classList.toggle("visible");

  backdropEl.classList.toggle("hidden");
  backdropEl.classList.toggle("visible");

  iconOpen.classList.toggle("hidden");
  iconOpen.classList.toggle("visible");
  iconClose.classList.toggle("hidden");
  iconClose.classList.toggle("visible");
};

const closeMenu = () => {
    mobileMenuIconEl.classList.remove('active')
    mobileMenuEl.classList.remove('show')

    mobileMenuEl.classList.remove('visible')
    backdropEl.classList.remove('visible')
    iconOpen.classList.remove('hidden')
    iconClose.classList.remove('visible')

    mobileMenuEl.classList.add('hidden')
    backdropEl.classList.add('hidden')
    iconOpen.classList.add('visible')
    iconClose.classList.add('hidden')

    setTimeout(() => {
        mobileMenuEl.style.display = "none";
        backdropEl.style.display = 'none';
      }, 550);
}

// Event listeners
mobileMenuIconEl.addEventListener("click", toggleMobileMenu);
backdropEl.addEventListener('click', closeMenu)
menuLinksEls.forEach((el) => {
    el.addEventListener('click', closeMenu)
})