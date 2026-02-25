import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../services/productService';
import { Loader, ErrorMessage } from '../components';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchProductById(id)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  if (loading) return <Loader message="Loading product details..." />;
  if (error) return <ErrorMessage message={`Error: ${error}`} onRetry={handleRetry} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <div className="product-details-container">
      <Link to="/" className="back-btn">← Back to Products</Link>
      
      <div className="product-details">
        <div className="product-details-image">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        
        <div className="product-details-info">
          <h1>{product.title}</h1>
          <p className="product-details-description">{product.description}</p>
          <div className="product-details-price">${product.price}</div>
          <div className="product-details-rating">Rating: {product.rating}</div>
          <div className="product-details-category">Category: {product.category}</div>
          <div className="product-details-brand">Brand: {product.brand}</div>
          <div className="product-details-stock">Stock: {product.stock} items</div>
          
          {product.images && product.images.length > 1 && (
            <div className="product-images">
              <h3>More Images</h3>
              <div className="images-grid">
                {product.images.map((img, index) => (
                  <img key={index} src={img} alt={`${product.title} ${index + 1}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
