const products = [
    {
        id: 1,
        name: 'Modern Sofa',
        price: 999.99,
        modelUrl: 'maneki.html',
        image: 'images/sofa-thumbnail.jpg'
    },
    // Add more products here
];

document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.querySelector('.products-grid');
    
    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price}</p>
                    <div class="product-actions">
                        <a href="${product.modelUrl}" class="view-ar">View Details & AR</a>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productCard;
    });
}); 