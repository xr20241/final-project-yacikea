import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': any;
        }
    }
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart, cart, removeFromCart } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const product = products.find(p => String(p.id) === id);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    if (!product) return <div>Product not found</div>;

    return (
        <div className="container">
            <header>
                <h1>Product Details</h1>
                <div className="cart-icon-container">
                    <button 
                        className="cart-icon-button"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                    >
                        <FaShoppingCart size={24} color="#000000" />
                        {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
                    </button>
                    
                    {isCartOpen && (
                        <div className="cart-summary">
                            <div className="cart-items">
                                {cart.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <span>{item.name} x {item.quantity}</span>
                                        <div className="cart-item-actions">
                                            <button 
                                                className="remove-item"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                -
                                            </button>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="cart-total">
                                Total: ${total.toFixed(2)}
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <div className="product-detail">
                <div className="product-info">
                    <h2>{product.name}</h2>
                    <p className="product-price">${product.price}</p>
                    <button 
                        className="add-to-cart"
                        onClick={() => addToCart(product)}
                    >
                        Add to Cart
                    </button>
                    <button 
                        className="back-to-products"
                        onClick={() => window.history.back()}
                    >
                        Back to Products
                    </button>
                </div>
                
                <div className="model-viewer-container">
                    <model-viewer
                        id="furnitureViewer"
                        ar
                        ar-modes="webxr scene-viewer quick-look"
                        camera-controls
                        shadow-intensity="1"
                        auto-rotate
                        ar-scale="fixed"
                        ios-src={product.iosSrc}
                        style={{ width: '100%', height: '500px' }}
                    >
                    </model-viewer>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
