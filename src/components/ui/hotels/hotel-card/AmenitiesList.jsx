import PropTypes from 'prop-types';

export const AmenitiesList = ({ amenities, maxItems = 3 }) => {
  if (!amenities?.length) return null;

  const gradients = [
    'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200',
    'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200',
    'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200',
    'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border border-orange-200',
    'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border border-rose-200',
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {amenities.slice(0, maxItems).map((amenity, idx) => (
        <span 
          key={idx} 
          className={`text-xs px-3 py-1.5 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-200 ${gradients[idx % gradients.length]}`}
        >
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