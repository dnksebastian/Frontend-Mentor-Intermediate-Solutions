// Mobile menu
document.addEventListener('alpine:init', () => {
    Alpine.data('mobmenu', () => ({
        open: false,
        showClose: false,
        showOpen: true,
        showCart: false,
        toggleMenu() {
            this.open = !this.open
            this.showClose = !this.showClose
            this.showOpen = !this.showOpen
        },
        toggleCart() {
            this.showCart = !this.showCart
        }
    }))
})
