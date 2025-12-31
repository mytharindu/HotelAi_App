import { Search } from "lucide-react";
import PropTypes from "prop-types";

function LocationFilter({
  selectedLocations,
  setSelectedLocations,
  locationSearch,
  setLocationSearch,
  filteredLocations,
  handleLocationToggle,
}) {
  return (
    <div>
      <h3 className="font-semibold mb-3 flex items-center justify-between">
        Location
        {selectedLocations.length > 0 && (
          <button
            onClick={() => setSelectedLocations([])}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </h3>
      <div className="relative mb-2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search locations..."
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
      </div>
      <div className="max-h-40 overflow-y-auto space-y-2">
        {filteredLocations.map(location => (
          <label key={location._id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedLocations.includes(location.name)}
              onChange={() => handleLocationToggle(location.name)}
              className="rounded"
            />
            <span className="text-sm">{location.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
LocationFilter.propTypes = {
  selectedLocations: PropTypes.array.isRequired,
  setSelectedLocations: PropTypes.func.isRequired,
  locationSearch: PropTypes.string.isRequired,
  setLocationSearch: PropTypes.func.isRequired,
  filteredLocations: PropTypes.array.isRequired,
  handleLocationToggle: PropTypes.func.isRequired,
};
export default LocationFilter;