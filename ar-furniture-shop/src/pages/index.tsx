import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const HomePage: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cart, removeFromCart } = useCart();
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="container">
            <header>
                <h1>AR Furniture Shop</h1>
                <div className="cart-icon-container">
                    <button 
                        className="cart-icon-button"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                    >
                        <FaShoppingCart size={24} color="#000000"/>
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
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;