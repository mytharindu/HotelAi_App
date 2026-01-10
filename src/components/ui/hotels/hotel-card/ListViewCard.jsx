import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { CardContent } from "@/components/ui/card";
import { ImageCarousel } from "./ImageCarousel";
import { RatingBadge } from "./RatingBadge";
import { HotelInfo } from "./HotelInfo";
import { AmenitiesList } from "./AmenitiesList";
import { ReviewRating } from "./ReviewRating";
import { PricingSection } from "./PricingSection";

export const ListViewCard = ({
  hotel,
  currentImageIndex,
  onPrevImage,
  onNextImage,
  onViewDetails,
  onBookNow,
  reviews,
  cardVariants,
}) => {
  const images = Array.isArray(hotel.image) ? hotel.image : [hotel.image];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="flex flex-col md:flex-row gap-0 border-2 border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-2xl hover:border-amber-300 transition-all duration-300 group"
    >
      {/* Image Section */}
      <div className="relative w-full md:w-80 h-64 md:h-auto flex-shrink-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
        <ImageCarousel
          images={images}
          currentImageIndex={currentImageIndex}
          onPrevImage={onPrevImage}
          onNextImage={onNextImage}
          showButtons={true}
        />
      </div>

      {/* Content */}
      <CardContent className="flex-1 p-6 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50">
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <HotelInfo
                name={hotel.name}
                location={hotel.location || hotel.city}
                description={hotel.description}
                showDescription={true}
              />
              <ReviewRating reviews={reviews} className="mb-3" />
            </div>
            <div className="flex items-center gap-1 bg-gradient-to-r from-amber-100 to-orange-100 px-3 py-2 rounded-xl ml-3 flex-shrink-0 border-2 border-amber-200 shadow-sm">
              <RatingBadge rating={hotel.rating} variant="light" />
            </div>
          </div>

          <AmenitiesList amenities={hotel.amenities} maxItems={5} />
        </div>

        <PricingSection
          price={hotel.price}
          onViewDetails={onViewDetails}
          onBookNow={onBookNow}
          layout="horizontal"
        />
      </CardContent>
    </motion.div>
  );
};

ListViewCard.propTypes = {
  hotel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
    city: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    amenities: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
  }).isRequired,
  currentImageIndex: PropTypes.number.isRequired,
  onPrevImage: PropTypes.func.isRequired,
  onNextImage: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  onBookNow: PropTypes.func.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object),
  cardVariants: PropTypes.object,
};