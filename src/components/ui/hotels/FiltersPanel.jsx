"use client";

import { X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import LocationFilter from "./filters/LocationFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import StarRatingFilter from "./filters/StarRatingFilter";
import AmenitiesFilter from "./filters/AmenitiesFilter";
import CustomerRatingFilter from "./filters/GuestRatingFilter";

const styles = {
  container: {
    background: "linear-gradient(135deg, rgba(255, 248, 240, 0.8) 0%, rgba(254, 243, 230, 0.8) 100%)",
    border: "1px solid rgba(245, 158, 11, 0.2)",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow: "0 4px 20px rgba(245, 158, 11, 0.08)"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px"
  },
  filterCard: {
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 250, 245, 0.9) 100%)",
    border: "1px solid rgba(245, 158, 11, 0.15)",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
    transition: "all 0.3s ease",
    cursor: "pointer"
  },
  divider: {
    marginTop: "24px",
    paddingTop: "16px",
    borderTop: "1px solid rgba(245, 158, 11, 0.2)",
    display: "flex",
    justifyContent: "flex-end"
  },
  clearButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%)",
    border: "1px solid rgba(245, 158, 11, 0.3)",
    color: "#d97706",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  clearButtonHover: {
    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(251, 146, 60, 0.2) 100%)",
    boxShadow: "0 4px 12px rgba(245, 158, 11, 0.15)"
  }
};

function FiltersPanel({
  showFilters,
  selectedLocations,
  setSelectedLocations,
  locationSearch,
  setLocationSearch,
  filteredLocations,
  handleLocationToggle,
  priceRange,
  setPriceRange,
  selectedStars,
  handleStarToggle,
  allAmenities,
  selectedAmenities,
  handleAmenityToggle,
  minCustomerRating,
  setMinCustomerRating,
  activeFiltersCount,
  clearAllFilters,
}) {
  if (!showFilters) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      style={styles.container}
    >
      <div style={styles.grid}>
        <motion.div
          style={styles.filterCard}
          whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(245, 158, 11, 0.12)" }}
        >
          <LocationFilter
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
            locationSearch={locationSearch}
            setLocationSearch={setLocationSearch}
            filteredLocations={filteredLocations}
            handleLocationToggle={handleLocationToggle}
          />
        </motion.div>

        <motion.div
          style={styles.filterCard}
          whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(245, 158, 11, 0.12)" }}
        >
          <PriceRangeFilter priceRange={priceRange} setPriceRange={setPriceRange} />
        </motion.div>

        <motion.div
          style={styles.filterCard}
          whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(245, 158, 11, 0.12)" }}
        >
          <StarRatingFilter selectedStars={selectedStars} handleStarToggle={handleStarToggle} />
        </motion.div>

        <motion.div
          style={styles.filterCard}
          whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(245, 158, 11, 0.12)" }}
        >
          <AmenitiesFilter allAmenities={allAmenities} selectedAmenities={selectedAmenities} handleAmenityToggle={handleAmenityToggle} />
        </motion.div>

        <motion.div
          style={styles.filterCard}
          whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(245, 158, 11, 0.12)" }}
        >
          <CustomerRatingFilter 
            minCustomerRating={minCustomerRating} 
            setMinCustomerRating={setMinCustomerRating} 
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={styles.divider}
          >
            <motion.button
              onClick={clearAllFilters}
              style={styles.clearButton}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.clearButtonHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, {
                  background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%)",
                  boxShadow: "none"
                });
              }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-4 h-4" />
              Clear all filters
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
FiltersPanel.propTypes = {
  showFilters: PropTypes.bool.isRequired,
  selectedLocations: PropTypes.array.isRequired,
  setSelectedLocations: PropTypes.func.isRequired,
  locationSearch: PropTypes.string.isRequired,
  setLocationSearch: PropTypes.func.isRequired,
  filteredLocations: PropTypes.array.isRequired,
  handleLocationToggle: PropTypes.func.isRequired,
  priceRange: PropTypes.array.isRequired,
  setPriceRange: PropTypes.func.isRequired,
  selectedStars: PropTypes.array.isRequired,
  handleStarToggle: PropTypes.func.isRequired,
  allAmenities: PropTypes.array.isRequired,
  selectedAmenities: PropTypes.array.isRequired,
  handleAmenityToggle: PropTypes.func.isRequired,
  minCustomerRating: PropTypes.number.isRequired,
  setMinCustomerRating: PropTypes.func.isRequired,
  activeFiltersCount: PropTypes.number.isRequired,
  clearAllFilters: PropTypes.func.isRequired,
};

export default FiltersPanel;
