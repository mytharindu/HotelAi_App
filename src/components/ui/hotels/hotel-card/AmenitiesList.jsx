import PropTypes from 'prop-types';

export const AmenitiesList = ({ amenities, maxItems = 3 }) => {
  if (!amenities?.length) return null;

  return (
    <div className="flex flex-wrap gap-1 mb-3">
      {amenities.slice(0, maxItems).map((amenity, idx) => (
        <span key={idx} className="text-xs px-2 py-1 bg-muted rounded-full">
          {amenity}
        </span>
      ))}
    </div>
  );
};

AmenitiesList.propTypes = {
  amenities: PropTypes.arrayOf(PropTypes.string),
  maxItems: PropTypes.number
};