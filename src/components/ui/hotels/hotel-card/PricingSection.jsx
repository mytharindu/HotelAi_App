import { Button } from "@/components/ui/button";
import { Eye, CalendarCheck } from "lucide-react";
import PropTypes from "prop-types";

export const PricingSection = ({ 
  price, 
  onViewDetails, 
  onBookNow,
  layout = "vertical" 
}) => {
  if (layout === "horizontal") {
    return (
      <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 rounded-xl border border-amber-200">
          <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            ${price}
          </span>
          <span className="text-sm text-gray-600 font-semibold"> /night</span>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onViewDetails}
            className="border-2 border-gray-300 hover:border-amber-400 hover:bg-amber-50 font-semibold transition-all"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button 
            onClick={onBookNow}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            <CalendarCheck className="w-4 h-4 mr-2" />
            Book Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4 pt-3 border-t-2 border-gray-100">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 rounded-xl border border-amber-200">
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            ${price}
          </span>
          <span className="text-sm text-gray-600 font-semibold"> /night</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1 border-2 border-gray-300 hover:border-amber-400 hover:bg-amber-50 font-semibold transition-all" 
          onClick={onViewDetails}
        >
          <Eye className="w-4 h-4 mr-2" />
          Details
        </Button>
        <Button 
          className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-105" 
          onClick={onBookNow}
        >
          <CalendarCheck className="w-4 h-4 mr-2" />
          Book
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