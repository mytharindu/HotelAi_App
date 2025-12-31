
import { Grid3x3, List } from 'lucide-react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

function ViewToggle({ viewMode, setViewMode }) {
  const styles = {
    container: {
      display: 'flex',
      gap: '0.5rem',
      padding: '0.5rem',
      backgroundColor: '#ffffff',
      border: '2px solid #f3e5d3',
      borderRadius: '0.75rem',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: 'transparent',
      color: '#6b7280',
    },
    buttonActive: {
      backgroundColor: '#f59e0b',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
    },
    icon: {
      width: '1.25rem',
      height: '1.25rem',
    },
  };

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {['grid', 'list'].map((mode) => (
        <motion.button
          key={mode}
          onClick={() => setViewMode(mode)}
          style={{
            ...styles.button,
            ...(viewMode === mode && styles.buttonActive),
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {mode === 'grid' ? (
            <Grid3x3 style={styles.icon} />
          ) : (
            <List style={styles.icon} />
          )}
        </motion.button>
      ))}
    </motion.div>
  );
}
ViewToggle.propTypes = {
  viewMode: PropTypes.string.isRequired,
  setViewMode: PropTypes.func.isRequired,
};

export default ViewToggle;
