import { Wifi, Waves, Dumbbell, Utensils, Car, Wind } from "lucide-react";
import PropTypes from "prop-types";

const amenityIcons = {
  WiFi: Wifi,
  Pool: Waves,
  Gym: Dumbbell,
  Restaurant: Utensils,
  Parking: Car,
  AC: Wind,
};

function AmenitiesFilter({ allAmenities, selectedAmenities, handleAmenityToggle }) {
  return (
    <div>
      <h3 className="font-semibold mb-3">Amenities</h3>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {allAmenities.map(amenity => {
          const Icon = amenityIcons[amenity];
          return (
            <label key={amenity} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                className="rounded"
              />
              <div className="flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                <span className="text-sm">{amenity}</span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
AmenitiesFilter.propTypes = {
  allAmenities: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedAmenities: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleAmenityToggle: PropTypes.func.isRequired,
};

export default AmenitiesFilter;