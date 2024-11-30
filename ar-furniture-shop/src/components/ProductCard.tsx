import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <div className="product-actions">
                    <Link to={product.modelUrl} className="view-ar button">
                        View Details & AR
                    </Link>
                    <button 
                        className="add-to-cart button"
                        onClick={() => addToCart(product)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;