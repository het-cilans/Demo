import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img 
        src={product.thumbnail} 
        alt={product.title}
        className="product-card-image"
        loading="lazy"
      />
      <div className="product-card-content">
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-description">{product.description}</p>
        <div className="product-card-price">${product.price}</div>
        <div className="product-card-rating">Rating: {product.rating}</div>
        <Link to={`/product/${product.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
