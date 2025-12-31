import { Star } from "lucide-react";
import PropTypes from "prop-types";

function CustomerRatingFilter({ minCustomerRating, setMinCustomerRating }) {
  return (
    <div>
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        Customer Rating
      </h3>
      <div className="space-y-2">
        {[5, 4, 3, 2].map((rating) => (
          <label
            key={rating}
            className="flex items-center gap-2 cursor-pointer hover:text-yellow-600 transition"
          >
            <input
              type="radio"
              name="customerRating"
              checked={minCustomerRating === rating}
              onChange={() => setMinCustomerRating(rating)}
              className="rounded-full accent-yellow-400"
            />
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm ml-1">{rating}+ and up</span>
            </div>
          </label>
        ))}
        <label className="flex items-center gap-2 cursor-pointer hover:text-yellow-600 transition">
          <input
            type="radio"
            name="customerRating"
            checked={minCustomerRating === 0}
            onChange={() => setMinCustomerRating(0)}
            className="rounded-full accent-yellow-400"
          />
          <span className="text-sm">All ratings</span>
        </label>
      </div>
    </div>
  );
}
CustomerRatingFilter.propTypes = {
  minCustomerRating: PropTypes.number.isRequired,
  setMinCustomerRating: PropTypes.func.isRequired,
};

export default CustomerRatingFilter;