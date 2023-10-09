document.addEventListener('alpine:init', () => {
    Alpine.data('controls', () => ({
        showCart: false,
        cartItemsToAdd: 0,
        currentCartItems: 0,
        finalCartPrice: '',
        toggleCart() {
            this.showCart = !this.showCart
        },
        addItemToAdd() {
            this.cartItemsToAdd++
        },
        removeItemToAdd() {
            if(this.cartItemsToAdd > 0) {
                this.cartItemsToAdd--
            }
        },
        updateCart() {
            this.currentCartItems += this.cartItemsToAdd
            this.cartItemsToAdd = 0
            this.finalCartPrice = `$${(this.currentCartItems * 125).toFixed(2)}`
        },
        clearCart() {
            this.currentCartItems = 0
            this.cartItemsToAdd = 0
            this.finalCartPrice = ''
        },
        checkout() {
            this.clearCart()
            this.showCart = false;
        }
    }))
})


// Mobile menu

const navMenuEl = document.getElementById('top-nav')
const toggleMenuEl = document.querySelector('.menu-toggle-wrapper')
const menuBackdropEl = document.querySelector('.backdrop');
const iconOpenEl = document.querySelector('.icon-open');
const iconCloseEl = document.querySelector('.icon-close');


const toggleMobileMenu = () => {
    navMenuEl.classList.toggle('menu-active');
    menuBackdropEl.classList.toggle('backdrop-active')
    menuBackdropEl.classList.toggle('backdrop-hidden');
    iconOpenEl.classList.toggle('icon-visible');
    iconOpenEl.classList.toggle('icon-hidden');
    iconCloseEl.classList.toggle('icon-visible');
    iconCloseEl.classList.toggle('icon-hidden');
};

const hideMenu = () => {
    navMenuEl.classList.remove('menu-active');
    menuBackdropEl.classList.remove('backdrop-active');
    menuBackdropEl.classList.add('backdrop-hidden');
    
    iconOpenEl.classList.remove('icon-hidden')
    iconOpenEl.classList.add('icon-visible')

    iconCloseEl.classList.remove('icon-visible')
    iconCloseEl.classList.add('icon-hidden')
}

toggleMenuEl.addEventListener('click', toggleMobileMenu);
menuBackdropEl.addEventListener('click', hideMenu);

// Product image & lightbox controls
// const productThumbnailsEls = document.querySelectorAll('.thumbnail-wrap');
// const productThumbnailRadios = document.querySelectorAll('.thumbnail-radio');

const largeSlidesEls = document.querySelectorAll('.product-image-wrapper');
const largeImgEl = document.querySelector('.product-large-img-wrap');

const slideThumbnailsWrapEl = document.getElementById('product-thumbnails-wrap');

const slideThumbnailsBtns = document.querySelectorAll('.product-thumbnail-btn');

const prevSlideBtn = document.getElementById('btn-slideprev');
const nextSlideBtn = document.getElementById('btn-slidenext');

// console.log(productThumbnailsEls);
// console.log(productThumbnailRadios);
// console.log(largeImgEl);
// console.log(largeSlidesEls);

let currentSlide = 1

const prevSlide = () => {
    if (currentSlide <= 1) {
        currentSlide = 4
    } else {
        currentSlide--
    }

    displaySlide(currentSlide);

    console.log(currentSlide);
};

const nextSlide = () => {
    if (currentSlide >= 4) {
        currentSlide = 1
    } else {
        currentSlide++
    }

    displaySlide(currentSlide);

    console.log(currentSlide);
};

const setSlide = (slide) => {
    currentSlide = slide
};

const displaySlide = (slideNum) => {

    slideThumbnailsBtns.forEach(btn => {
        if(+btn.dataset.slideval === +slideNum) {
            btn.click()
            btn.focus()
            btn.setAttribute('aria-selected', true)
        } else {
            btn.setAttribute('aria-selected', false)
        }
    })

    // productThumbnailRadios.forEach(radio => {
    //     if(radio.value === slideNum) {
    //         radio.checked = true
    //     } else {
    //         radio.checked = false
    //     }
    // })

    largeSlidesEls.forEach(slideEl => {
        if (+slideEl.dataset.slide === +slideNum) {
            slideEl.hidden = false;
        } else {
            slideEl.hidden = true;
        }
    })

};

slideThumbnailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const chosenSlide = e.target.dataset.slideval;
        displaySlide(chosenSlide)
    })
})

prevSlideBtn.addEventListener('click', prevSlide)
nextSlideBtn.addEventListener('click', nextSlide)

// productThumbnailRadios.forEach(radioEl => {
//     radioEl.addEventListener('change', (e) => {
//         const slideToSet = e.target.value;
//         setSlide(slideToSet)
//     })
// })


// productThumbnailRadios.forEach(radioEl => {
//     radioEl.addEventListener('change', () => {
//         displaySlide(currentSlide)
//     })
// })


slideThumbnailsWrapEl.addEventListener('keydown', (e) => {
    const keydownLeft = 'ArrowLeft';
    const keydownRight = 'ArrowRight';
    
    if (e.code === keydownRight) {
        nextSlide()
    }
    
    if (e.code === keydownLeft) {
        prevSlide()    
    }
})