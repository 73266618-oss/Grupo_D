/**
 * Lógica de la interfaz final para el proceso de compra (Checkout)
 */
document.addEventListener('DOMContentLoaded', () => {
    const totalElement = document.getElementById('checkout-total');
    if (totalElement) {
        totalElement.textContent = `S/ ${getCartTotal().toFixed(2)}`;
    }
    
    // Control de seguridad: Si el carrito se encuentra vacío al ingresar a la página de checkout, redireccionar
    if (cart.length === 0 && window.location.pathname.includes('checkout.html')) {
        alert('Tu carrito está vacío.');
        window.location.href = 'catalog.html';
    }
});