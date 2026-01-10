import { MapPin } from "lucide-react";
import PropTypes from "prop-types";

export const HotelInfo = ({ name, location, description, showDescription = true }) => (
  <div>
    <h3 className="text-xl font-bold mb-2 line-clamp-1 text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
      {name}
    </h3>
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
        <MapPin className="w-3.5 h-3.5 text-amber-600" />
      </div>
      <span className="line-clamp-1 font-medium">{location}</span>
    </div>
    {showDescription && description && (
      <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed font-medium">
        {description}
      </p>
    )}
  </div>
);

HotelInfo.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  description: PropTypes.string,
  showDescription: PropTypes.bool,
};