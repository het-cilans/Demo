import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const refresh = () => {
        setLoading(true);
        setError(null);
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h2>Home</h2>
          <Link to="/login" className="login-btn">Login</Link>
        </div>
      </header>

      <main className="home-main">
        {loading && <div className="loader">Loading products...</div>}
        
        {error && <div className="error-message" onClick={refresh}>Error: {error} (Click to retry)</div>}
        
        {!loading && !error && products.length === 0 && (
          <div className="error-message">No products found</div>
        )}
        
        {!loading && !error && products.length > 0 && (
          <>
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.thumbnail} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <div className="product-price">${product.price}</div>
                  <div className="product-rating">Rating: {product.rating}</div>
                  <Link to={`/product/${product.id}`} className="view-details-btn">View Details</Link>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
