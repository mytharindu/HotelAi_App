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
      className="flex flex-col md:flex-row gap-4 border rounded-2xl overflow-hidden bg-card hover:shadow-xl transition-shadow"
    >
      {/* Image Section */}
      <div className="relative w-full md:w-80 h-64 md:h-auto flex-shrink-0 overflow-hidden">
        <ImageCarousel
          images={images}
          currentImageIndex={currentImageIndex}
          onPrevImage={onPrevImage}
          onNextImage={onNextImage}
          showButtons={true}
        />
      </div>

      {/* Content */}
      <CardContent className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <HotelInfo
                name={hotel.name}
                location={hotel.location || hotel.city}
                description={hotel.description}
                showDescription={true}
              />
              <ReviewRating reviews={reviews} className="mb-2" />
            </div>
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg ml-2 flex-shrink-0">
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