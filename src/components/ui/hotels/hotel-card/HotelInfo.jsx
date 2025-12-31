import { MapPin } from "lucide-react";
import PropTypes from "prop-types";

export const HotelInfo = ({ name, location, description, showDescription = true }) => (
  <div>
    <h3 className="text-lg font-semibold mb-1 line-clamp-1">{name}</h3>
    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
      <MapPin className="w-4 h-4" />
      <span className="line-clamp-1">{location}</span>
    </div>
    {showDescription && description && (
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
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