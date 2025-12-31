import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useGetReviewsForHotelQuery } from "@/lib/api";
import { ListViewCard } from "./../components/ui/hotels/hotel-card/ListViewCard";
import { GridViewCard } from "./ui/hotels/hotel-card/GridViewCard";

export default function HotelCard({ hotel, viewMode = "grid" }) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch reviews for the hotel
  const { data: reviews = [] } = useGetReviewsForHotelQuery(hotel._id);

  const images = Array.isArray(hotel.image) ? hotel.image : [hotel.image];

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleViewDetails = () => navigate(`/hotels/${hotel._id}`);
  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate(`/hotels/${hotel._id}/book`);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  const commonProps = {
    hotel,
    currentImageIndex,
    onPrevImage: handlePrevImage,
    onNextImage: handleNextImage,
    onViewDetails: handleViewDetails,
    onBookNow: handleBookNow,
    reviews,
    cardVariants,
  };
  return viewMode === "list" ? (
    <ListViewCard {...commonProps} />
  ) : (
    <GridViewCard {...commonProps} />
  );
}

HotelCard.propTypes = {
  hotel: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ])
  }).isRequired,
  viewMode: PropTypes.oneOf(["grid", "list"])
};


