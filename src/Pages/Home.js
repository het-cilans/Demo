import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../hooks/useProducts';
import { ProductCard, Loader, ErrorMessage } from '../components';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const {
    products,
    loading,
    error,
    total,
    currentPage,
    totalPages,
    limit,
    goToNextPage,
    goToPrevPage,
    refresh,
  } = useProducts(10);

  const productList = useMemo(() => {
    return products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  }, [products]);

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h2>Home</h2>
          {isAuthenticated ? (
            <div className="user-info">
             
              <button onClick={logout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </div>
      </header>

      <main className="home-main">
        {loading && <Loader message="Loading products..." />}
        
        {error && <ErrorMessage message={`Error: ${error}`} onRetry={refresh} />}
        
        {!loading && !error && products.length === 0 && (
          <ErrorMessage message="No products found" onRetry={refresh} />
        )}
        
        {!loading && !error && products.length > 0 && (
          <>
            <div className="pagination-info">
              Showing {startItem}-{endItem} of {total} products
            </div>
            
            <div className="products-grid">
              {productList}
            </div>
            
            <div className="pagination-controls">
              <button 
                className="pagination-btn"
                onClick={goToPrevPage}
                disabled={currentPage === 1 || loading}
              >
                Previous
              </button>
              
              <span className="page-indicator">
                Page {currentPage} of {totalPages}
              </span>
              
              <button 
                className="pagination-btn"
                onClick={goToNextPage}
                disabled={currentPage === totalPages || loading}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
