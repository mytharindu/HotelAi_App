import PropTypes from "prop-types";

function PriceRangeFilter({ priceRange, setPriceRange }) {
  return (
    <div>
      <h3 className="font-semibold mb-3">Price Range</h3>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-muted-foreground">Min: ${priceRange.min}</label>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange.min}
            onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Max: ${priceRange.max}</label>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange.max}
            onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

PriceRangeFilter.propTypes = {
  priceRange: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  setPriceRange: PropTypes.func.isRequired,
};

export default PriceRangeFilter;