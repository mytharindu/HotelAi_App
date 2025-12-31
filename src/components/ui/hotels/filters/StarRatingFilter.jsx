import { Star } from "lucide-react";
import PropTypes from "prop-types";

function StarRatingFilter({ selectedStars, handleStarToggle }) {
  return (
    <div>
      <h3 className="font-semibold mb-3">Star Rating</h3>
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map(star => (
          <label key={star} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedStars.includes(star)}
              onChange={() => handleStarToggle(star)}
              className="rounded"
            />
            <div className="flex items-center gap-1">
              {[...Array(star)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
StarRatingFilter.propTypes = {
  selectedStars: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleStarToggle: PropTypes.func.isRequired,
};

export default StarRatingFilter;