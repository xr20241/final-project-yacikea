import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': any;
        }
    }
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();
    const product = products.find(p => String(p.id) === id);

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
    );
};

export default ProductDetail;