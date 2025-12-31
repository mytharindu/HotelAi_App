import * as React from "react"
import PropTypes from "prop-types";
import { motion } from 'framer-motion';

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) return null;

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      marginTop: '2rem',
      flexWrap: 'wrap',
    },
    button: {
      padding: '0.5rem 1rem',
      border: '2px solid #f3e5d3',
      borderRadius: '0.5rem',
      backgroundColor: '#ffffff',
      color: '#1f2937',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '0.875rem',
      transition: 'all 0.3s ease',
    },
    buttonActive: {
      backgroundColor: '#f59e0b',
      color: '#ffffff',
      borderColor: '#f59e0b',
      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
    },
    buttonHover: {
      borderColor: '#f59e0b',
      backgroundColor: '#fef3e6',
    },
    buttonDisabled: {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
    pageNumbers: {
      display: 'flex',
      gap: '0.25rem',
    },
    ellipsis: {
      padding: '0.5rem 0.5rem',
      fontSize: '0.875rem',
      color: '#9ca3af',
    },
  };

  const [hoveredButton, setHoveredButton] = React.useState(null);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(Math.max(1, currentPage - 1));
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(Math.min(totalPages, currentPage + 1));
    }
  };

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        style={{
          ...styles.button,
          ...(currentPage === 1 && styles.buttonDisabled),
          ...(hoveredButton === 'prev' && currentPage !== 1 && styles.buttonHover),
        }}
        onMouseEnter={() => setHoveredButton('prev')}
        onMouseLeave={() => setHoveredButton(null)}
        whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
        whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
      >
        ← Previous
      </motion.button>

      <motion.div
        style={styles.pageNumbers}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <motion.button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  ...styles.button,
                  ...(currentPage === page && styles.buttonActive),
                  ...(hoveredButton === page && currentPage !== page && styles.buttonHover),
                }}
                onMouseEnter={() => setHoveredButton(page)}
                onMouseLeave={() => setHoveredButton(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {page}
              </motion.button>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <span key={page} style={styles.ellipsis}>
                ...
              </span>
            );
          }
          return null;
        })}
      </motion.div>

      <motion.button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        style={{
          ...styles.button,
          ...(currentPage === totalPages && styles.buttonDisabled),
          ...(hoveredButton === 'next' && currentPage !== totalPages && styles.buttonHover),
        }}
        onMouseEnter={() => setHoveredButton('next')}
        onMouseLeave={() => setHoveredButton(null)}
        whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
        whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
      >
        Next →
      </motion.button>
    </motion.div>
  );
}
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
