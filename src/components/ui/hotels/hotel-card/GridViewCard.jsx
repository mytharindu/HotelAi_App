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
      className="border rounded-2xl overflow-hidden bg-card hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      <div className="relative h-56 group overflow-hidden">
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
      <CardContent className="p-4">
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