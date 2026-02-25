import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../services/productService';

export const useProducts = (initialLimit = 10) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(initialLimit);
  const [skip, setSkip] = useState(0);

  const totalPages = Math.ceil(total / limit);

  const loadProducts = useCallback(async (skipValue = 0) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchProducts(limit, skipValue);
      setProducts(data.products);
      setTotal(data.total);
      setSkip(skipValue);
      setCurrentPage((skipValue / limit) + 1);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    loadProducts(0);
  }, [loadProducts]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      const newSkip = skip + limit;
      loadProducts(newSkip);
    }
  }, [currentPage, totalPages, skip, limit, loadProducts]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      const newSkip = skip - limit;
      loadProducts(newSkip);
    }
  }, [currentPage, skip, limit, loadProducts]);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      const newSkip = (page - 1) * limit;
      loadProducts(newSkip);
    }
  }, [totalPages, limit, loadProducts]);

  const refresh = useCallback(() => {
    loadProducts(skip);
  }, [loadProducts, skip]);

  return {
    products,
    loading,
    error,
    total,
    currentPage,
    totalPages,
    limit,
    skip,
    goToNextPage,
    goToPrevPage,
    goToPage,
    refresh,
  };
};

export default useProducts;
