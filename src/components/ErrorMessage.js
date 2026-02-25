import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message = 'An error occurred', onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Click to retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
