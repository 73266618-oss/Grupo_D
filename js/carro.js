// Lógica del carrito de compras
let cart = JSON.parse(localStorage.getItem('casaSeguraCart')) || [];

function saveCart() {
    localStorage.setItem('casaSeguraCart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    alert(`${product.name} agregado al carrito.`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    if (typeof renderCart === 'function') renderCart();
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            if (typeof renderCart === 'function') renderCart();
        }
    }
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Inicializar el contador del carrito al cargar la página
document.addEventListener('DOMContentLoaded', updateCartCount);