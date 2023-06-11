// DOM Elements & variables
const mobileMenuIconEl = document.getElementById("mob-menu-wrap");
const mobileMenuEl = document.getElementById("top-nav");
const iconOpen = document.getElementById("hamburger-open");
const iconClose = document.getElementById("hamburger-close");
const backdropEl = document.getElementById("backdrop");
const menuLinksEls = document.querySelectorAll(".nav-a");

const footerMailFormEl = document.getElementById('ft-mail-form');
const emailInputEl = document.getElementById('email');
const errorMessageEl = document.getElementById('err')

const carouselWrapperEl = document.getElementById('carousel-container')
const slidesEls = document.querySelectorAll('.review-slide')
const carouselControlsEls = document.querySelectorAll('.carousel-option')

// Functions

const handleWheelSlide = (e) => {
  e.preventDefault()
  let wheel = e.deltaY
  let slideOptionChecked = +document.querySelector('.carousel-option:checked').value
  let newSlideNum = slideOptionChecked

  if(wheel >= 0) {
    slideOptionChecked === 4 ? newSlideNum = 1: newSlideNum++
  }
  else if(wheel < 0) {
    slideOptionChecked === 1 ? newSlideNum = 4: newSlideNum-- 
  }
  
  let slideOptionToDisplay = document.getElementById(`option${newSlideNum}`)
  slideOptionToDisplay.checked = true;
  carouselChangeSlide()
}

const carouselChangeSlide = () => {
  let pickedSlideNum = document.querySelector('.carousel-option:checked').value
  let pickedSlide = document.getElementById(`slide${pickedSlideNum}`)
  
  pickedSlide.scrollIntoView({behavior: "smooth", block:"center", inline:"center"})
}

const validateForm = () => {
  if (emailInputEl.validity.valueMissing) {
    errorMessageEl.textContent = "Please enter your email";
    return false;
  } else if (emailInputEl.validity.typeMismatch) {
    errorMessageEl.textContent = "Please enter a valid email";
    return false;
  } else if (emailInputEl.validity.valid) {
    errorMessageEl.textContent = "";
    return true;
  }
}

const submitForm = (e) => {
  e.preventDefault();

  let isValid = validateForm()

  if(isValid) {
    console.log('submitted');
    footerMailFormEl.reset()
    footerMailFormEl.classList.remove('interacted')
  }
  else {
    console.log('not submitted');
    footerMailFormEl.classList.add('interacted')
  }
}

const toggleMobileMenu = () => {
  mobileMenuIconEl.classList.toggle("active");
  mobileMenuEl.classList.toggle("show");
  document.querySelector("body").classList.toggle("backdrop-open");

  if (mobileMenuEl.classList.contains("show")) {
    mobileMenuEl.style.display = "flex";
    backdropEl.style.display = "block";
  } else {
    setTimeout(() => {
      mobileMenuEl.style.display = "none";
      backdropEl.style.display = "none";
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
  document.querySelector("body").classList.remove("backdrop-open");
  mobileMenuIconEl.classList.remove("active");
  mobileMenuEl.classList.remove("show");

  mobileMenuEl.classList.remove("visible");
  backdropEl.classList.remove("visible");
  iconOpen.classList.remove("hidden");
  iconClose.classList.remove("visible");

  mobileMenuEl.classList.add("hidden");
  backdropEl.classList.add("hidden");
  iconOpen.classList.add("visible");
  iconClose.classList.add("hidden");

  setTimeout(() => {
    mobileMenuEl.style.display = "none";
    backdropEl.style.display = "none";
  }, 550);
};

// Event listeners
mobileMenuIconEl.addEventListener("click", toggleMobileMenu);
backdropEl.addEventListener("click", closeMenu);
menuLinksEls.forEach((el) => {
  el.addEventListener("click", closeMenu);
});


footerMailFormEl.addEventListener('submit', submitForm);


emailInputEl.addEventListener('input', validateForm);
emailInputEl.addEventListener('blur', validateForm);


emailInputEl.addEventListener('click', () => {
    footerMailFormEl.classList.add('interacted')
})

carouselControlsEls.forEach((el) => {
  el.addEventListener('click', carouselChangeSlide)
})

carouselWrapperEl.addEventListener('wheel', handleWheelSlide)