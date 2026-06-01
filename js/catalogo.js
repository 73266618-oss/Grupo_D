// Lógica específica del catálogo para Casa Segura
document.addEventListener('DOMContentLoaded', () => {
    const catalogContainer = document.getElementById('catalog-products');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filtered = products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm) || 
                                  p.description.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        renderProducts(filtered, catalogContainer);
    }

    if (catalogContainer) {
        renderProducts(products, catalogContainer);
        
        // Controladores de eventos para el filtrado dinámico
        searchInput.addEventListener('input', filterProducts);
        categoryFilter.addEventListener('change', filterProducts);
    }
});