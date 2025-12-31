import { Star } from "lucide-react";
import PropTypes from "prop-types";

export const RatingBadge = ({ rating, position = "top-right", variant = "dark" }) => {
  const positionClasses = {
    "top-right": "top-2 right-2",
    "top-left": "top-2 left-2",
  };

  const variantClasses = {
    dark: "bg-white/80 backdrop-blur-sm",
    light: "bg-primary/10",
  };

  return (
    <div className={`absolute ${positionClasses[position]} flex items-center gap-1 ${variantClasses[variant]} px-2 py-1 rounded-lg shadow`}>
      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    </div>
  );
};

RatingBadge.propTypes = {
  rating: PropTypes.number,
  position: PropTypes.oneOf(["top-right", "top-left"]),
  variant: PropTypes.oneOf(["dark", "light"]),
};