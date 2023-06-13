// DOM Elements & variables
const mobileMenuIconEl = document.getElementById("mob-menu-wrap");
const mobileMenuEl = document.getElementById("top-nav");
const iconOpen = document.getElementById("hamburger-open");
const iconClose = document.getElementById("hamburger-close");
const backdropEl = document.getElementById("backdrop");
const menuLinksEls = document.querySelectorAll(".nav-a");

const footerMailFormEl = document.getElementById("ft-mail-form");
const emailInputEl = document.getElementById("email");
const errorMessageEl = document.getElementById("err");

// Carousel Elements & scripts
const carouselWrapperEl = document.getElementById("carousel-container");
// const slidesEls = document.querySelectorAll(".review-slide");
const carouselControlsEls = document.querySelectorAll(".carousel-option");

const getSlidesData = async () => {
  try {
    const res = await fetch("./slides.json");
    const slides = await res.json();
    return slides;
  } catch (err) {
    console.log(err);
  }
};

const createNewSlide = (id, avatarURL, uname, content) => {
  const newSlideLiEl = document.createElement("li");
  newSlideLiEl.classList.add("review-slide");
  newSlideLiEl.classList.add("flex-col");
  newSlideLiEl.id = `slide${id}`;

  const newSlideAvatarWrap = document.createElement("div");
  newSlideAvatarWrap.classList.add("avatar-wrap");
  const newUserAvatar = document.createElement("img");
  newUserAvatar.classList.add("avatar-img");
  newUserAvatar.src = avatarURL;
  newUserAvatar.alt = uname;

  const slideName = document.createElement("span");
  slideName.classList.add("review-name");
  slideName.textContent = uname;

  const slideContent = document.createElement("p");
  slideContent.classList.add("review-content");
  slideContent.textContent = content;

  newSlideLiEl.appendChild(newSlideAvatarWrap);
  newSlideAvatarWrap.appendChild(newUserAvatar);
  newSlideLiEl.appendChild(slideName);
  newSlideLiEl.appendChild(slideContent);

  return newSlideLiEl;
};

const getPopulatedSlide = async (index) => {
  const slidesData = await getSlidesData();
  const slideToRender = `slide${index}`;

  const id = slidesData[slideToRender].id;
  const avatarURL = slidesData[slideToRender].avatar;
  const uname = slidesData[slideToRender].uname;
  const content = slidesData[slideToRender].review;

  const slide = createNewSlide(id, avatarURL, uname, content);
  return slide;
};

const getNewSlidesArr = async (cId) => {
  let newSlidesArr = [];
  const data = await getSlidesData();
  // const slidesNum = Object.keys(data).length;

  console.log(data);

  let currentId;
  let prevId;
  let nextId;

  if (cId === 0) {
    currentId = cId
    prevId = slidesNum - 1
    nextId = currentId + 1
  } else if (cId === slidesNum - 1) {
    currentId = cId
    prevId = cId - 1
    nextId = 0
  } else {
    currentId = cId
    prevId = cId - 1
    nextId = cId + 1
  }

  console.log('prev:', prevId,'current:', currentId,'next:', nextId);

  // const previousSlide = await getPopulatedSlide(prevId);
  // const currentSlide = await getPopulatedSlide(currentId);
  // const nextSlide = await getPopulatedSlide(nextId);

  // newSlidesArr = [previousSlide, currentSlide, nextSlide];

  // for (let i = 1; i <= slidesNum; i++) {
  //   const slide = await getPopulatedSlide(i)
  //   newSlidesArr.push(slide)
  // }
  // carouselWrapperEl.replaceChildren(...newSlidesArr);
};

const changeSlides = (e) => {
  const centerSlide = +document.querySelector('.carousel-option:checked').value
  getNewSlidesArr(centerSlide)

}

carouselControlsEls.forEach((el) => {
  el.addEventListener('click', changeSlides)
})




// Other


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
};

const submitForm = (e) => {
  e.preventDefault();

  let isValid = validateForm();

  if (isValid) {
    console.log("submitted");
    footerMailFormEl.reset();
    footerMailFormEl.classList.remove("interacted");
  } else {
    console.log("not submitted");
    footerMailFormEl.classList.add("interacted");
  }
};

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

footerMailFormEl.addEventListener("submit", submitForm);

emailInputEl.addEventListener("input", validateForm);
emailInputEl.addEventListener("blur", validateForm);

emailInputEl.addEventListener("click", () => {
  footerMailFormEl.classList.add("interacted");
});

// carouselControlsEls.forEach((el) => {
//   el.addEventListener('click', carouselChangeSlide)
// })

// carouselWrapperEl.addEventListener('wheel', handleWheelSlide)

// carouselWrapperEl.addEventListener('scroll', makeInfiniteScroll)
