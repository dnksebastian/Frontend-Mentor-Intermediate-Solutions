document.addEventListener('alpine:init', () => {
    Alpine.data('controls', () => ({
        currentSlide: 0,
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