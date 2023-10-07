document.addEventListener('alpine:init', () => {
    Alpine.data('controls', () => ({
        openMenu: false,
        showClose: false,
        showOpen: true,
        currentSlide: 0,
        showCart: false,
        cartItemsToAdd: 0,
        currentCartItems: 0,
        finalCartPrice: '',
        toggleMenu() {
            this.openMenu = !this.openMenu
            this.showClose = !this.showClose
            this.showOpen = !this.showOpen
        },
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
        }
    }))
})