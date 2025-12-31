import * as React from "react"
import PropTypes from 'prop-types';
import { SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

function FilterButton({ showFilters, setShowFilters, activeFiltersCount }) {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      border: '2px solid #f3e5d3',
      borderRadius: '0.75rem',
      backgroundColor: showFilters ? '#fef3e6' : '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      color: '#1f2937',
      fontSize: '0.875rem',
    },
    containerHover: {
      backgroundColor: '#fef3e6',
      borderColor: '#f59e0b',
      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.1)',
    },
    icon: {
      width: '1.25rem',
      height: '1.25rem',
      color: '#f59e0b',
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f59e0b',
      color: '#ffffff',
      borderRadius: '9999px',
      padding: '0.25rem 0.5rem',
      fontSize: '0.75rem',
      fontWeight: '600',
      minWidth: '1.5rem',
    },
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.button
      onClick={() => setShowFilters(!showFilters)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.container,
        ...(isHovered && styles.containerHover),
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        animate={showFilters ? { rotate: 180 } : { rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SlidersHorizontal style={styles.icon} />
      </motion.div>
      <span>Filters</span>
      {activeFiltersCount > 0 && (
        <motion.span
          style={styles.badge}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {activeFiltersCount}
        </motion.span>
      )}
    </motion.button>
  );
}
FilterButton.propTypes = {
  showFilters: PropTypes.bool.isRequired,
  setShowFilters: PropTypes.func.isRequired,
  activeFiltersCount: PropTypes.number.isRequired,
};

export default FilterButton;
