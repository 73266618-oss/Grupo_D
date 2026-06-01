/**
 * Renderizado de la interfaz de usuario para la página del carrito
 */
function renderCart() {
    const listContainer = document.getElementById('cart-items-list');
    const totalElement = document.getElementById('cart-total-amount');
    
    if (!listContainer || !totalElement) return;

    listContainer.innerHTML = '';
    
    if (cart.length === 0) {
        listContainer.innerHTML = '<p style="text-align:center;">Tu carrito está vacío.</p>';
        totalElement.textContent = '0.00';
        return;
    }

    cart.forEach(item => {
        // Buscar el producto actualizado para obtener la ruta correcta de la imagen
        const currentProduct = products.find(p => p.id === item.id);
        const imageSrc = currentProduct ? currentProduct.image : item.image;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        // Al estar en el directorio /Pag, siempre retrocedemos un nivel para llegar a /img
        const imagePath = `../${imageSrc}`;

        itemDiv.innerHTML = `
            <img src="${imagePath}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>S/ ${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div style="margin-left: 20px; font-weight: bold;">
                S/ ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button onclick="removeFromCart(${item.id})" style="margin-left: 20px; color: red; border: none; background: none; cursor: pointer;">X</button>
        `;
        listContainer.appendChild(itemDiv);
    });

    totalElement.textContent = getCartTotal().toFixed(2);
}

document.addEventListener('DOMContentLoaded', renderCart);