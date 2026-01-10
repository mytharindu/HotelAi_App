import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ImageCarousel } from "./ImageCarousel";
import { RatingBadge } from "./RatingBadge";
import { HotelInfo } from "./HotelInfo";
import { AmenitiesList } from "./AmenitiesList";
import { ReviewRating } from "./ReviewRating";
import { PricingSection } from "./PricingSection";

export const GridViewCard = ({
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
      className="border-2 border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-2xl hover:border-amber-300 transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-56 group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
        <ImageCarousel
          images={images}
          currentImageIndex={currentImageIndex}
          onPrevImage={onPrevImage}
          onNextImage={onNextImage}
          showButtons={true}
        />
        <RatingBadge rating={hotel.rating} position="top-right" variant="dark" />
      </div>

      {/* Content */}
      <CardContent className="p-5 bg-gradient-to-b from-white to-gray-50">
        <HotelInfo
          name={hotel.name}
          location={hotel.location || hotel.city}
          description={hotel.description}
          showDescription={false}
        />

        <ReviewRating reviews={reviews} className="mb-3" />
        <AmenitiesList amenities={hotel.amenities} maxItems={3} />

        <PricingSection
          price={hotel.price}
          onViewDetails={onViewDetails}
          onBookNow={onBookNow}
          layout="vertical"
        />
      </CardContent>
    </motion.div>
  );
};