import { Star } from "lucide-react";
import PropTypes from "prop-types";

export const ReviewRating = ({ reviews, className = "" }) => {
  // No reviews yet
  if (!reviews?.length) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm text-gray-500">No reviews yet</span>
      </div>
    );
  }

  // Cal average rating
  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Stars */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(averageRating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Rating text */}
      <span className="text-sm font-medium text-gray-600">
        {averageRating} / 5 ({reviews.length} review
        {reviews.length > 1 ? "s" : ""})
      </span>
    </div>
  );
};

ReviewRating.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.number.isRequired,
    })
  ),
  className: PropTypes.string,
};