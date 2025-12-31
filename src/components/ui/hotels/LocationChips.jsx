import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

function LocationChips({ selectedLocations, handleLocationToggle, setSelectedLocations }) {
  if (selectedLocations.length === 0) return null;

  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      marginBottom: '1.5rem',
    },
    chip: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#fef3e6',
      color: '#f59e0b',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '500',
      border: '1px solid #f59e0b',
    },
    closeButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.25rem',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '9999px',
      transition: 'all 0.2s ease',
      color: '#f59e0b',
    },
    clearAll: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      color: '#6b7280',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {selectedLocations.map((loc) => (
          <motion.div
            key={loc}
            style={styles.chip}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)' }}
          >
            <span>{loc}</span>
            <motion.button
              onClick={() => handleLocationToggle(loc)}
              style={styles.closeButton}
              whileHover={{ backgroundColor: '#f59e0b', color: '#ffffff' }}
              whileTap={{ scale: 0.9 }}
            >
              <X style={{ width: '0.875rem', height: '0.875rem' }} />
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
      <motion.button
        onClick={() => setSelectedLocations([])}
        style={styles.clearAll}
        whileHover={{ color: '#f59e0b' }}
      >
        Clear all
      </motion.button>
    </motion.div>
  );
}
LocationChips.propTypes = {
  selectedLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleLocationToggle: PropTypes.func.isRequired,
  setSelectedLocations: PropTypes.func.isRequired,
};

export default LocationChips;
