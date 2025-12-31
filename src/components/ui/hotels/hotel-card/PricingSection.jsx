import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

export const PricingSection = ({ 
  price, 
  onViewDetails, 
  onBookNow,
  layout = "vertical" 
}) => {
  if (layout === "horizontal") {
    return (
      <div className="flex items-center justify-between pt-4 border-t">
        <div>
          <span className="text-2xl font-bold">${price}</span>
          <span className="text-sm text-muted-foreground"> /night</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onViewDetails}>
            View Details
          </Button>
          <Button onClick={onBookNow}>Book Now</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-2xl font-bold">${price}</span>
          <span className="text-sm text-muted-foreground"> /night</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onViewDetails}>
          View Details
        </Button>
        <Button className="flex-1" onClick={onBookNow}>
          Book Now
        </Button>
      </div>
    </>
  );
};

PricingSection.propTypes = {
  price: PropTypes.number.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  onBookNow: PropTypes.func.isRequired,
  layout: PropTypes.oneOf(["vertical", "horizontal"]),
};