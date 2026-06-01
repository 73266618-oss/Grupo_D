// Lógica principal de la interfaz de usuario
document.addEventListener('DOMContentLoaded', () => {
    const featuredContainer = document.getElementById('featured-products');
    
    if (featuredContainer) {
        // Mostrar únicamente los primeros 3 productos como destacados en el inicio
        renderProducts(products.slice(0, 3), featuredContainer);
    }
});

/**
 * Renderiza una lista de productos dentro de un contenedor específico
 * @param {Array} productsList - Lista de objetos de productos
 * @param {HTMLElement} container - Elemento del DOM donde se renderizarán
 */
function renderProducts(productsList, container) {
    container.innerHTML = '';
    
    if (productsList.length === 0) {
        container.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    productsList.forEach(product => {
        const card = document.createElement('article');
        card.className = 'product-card';
        
        // Detección del directorio actual para ajustar rutas relativas
        // Comprobación robusta compatible con rutas de servidores y archivos locales
        const isInPagFolder = window.location.pathname.split('/').includes('Pag') || 
                              window.location.pathname.split('\\').includes('Pag');

        const imagePath = isInPagFolder 
            ? `../${product.image}` 
            : product.image;

        card.innerHTML = `
            <img src="${imagePath}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">S/ ${product.price.toFixed(2)}</div>
                <button class="btn-add" onclick="addToCart(${product.id})">Agregar al Carrito</button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Manejador del evento de envío para el formulario de la página de inicio
document.addEventListener('submit', (e) => {
    if (e.target && e.target.id === 'home-contact-form') {
        e.preventDefault();
        alert('Gracias por tu interés. Un asesor de Casa Segura te contactará muy pronto.');
        e.target.reset();
    }
});