// Get product ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Fetch product details and update the page
function loadProductDetails(productId) {
    // In a real application, you would fetch this from a server
    const product = {
        id: productId,
        name: 'Modern Sofa',
        price: 999.99,
        modelSrc: '/assets/maneki.usdz',
        iosSrc: '/assets/maneki.usdz'
    };

    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = `$${product.price}`;
    
    const modelViewer = document.getElementById('furnitureViewer');
    modelViewer.src = product.modelSrc;
    modelViewer.iosSrc = product.iosSrc;
}

document.addEventListener('DOMContentLoaded', () => {
    loadProductDetails(productId);
}); 