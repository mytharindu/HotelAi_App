import { useMemo } from "react";

export function useFilteredHotels({
  hotels,
  selectedLocations,
  priceRange,
  sortBy,
  selectedStars,
  selectedAmenities,
  minGuestRating,
  minCustomerRating,
}) {
  // Get all unique amenities from hotels
  const allAmenities = useMemo(() => {
    if (!hotels) return [];
    const amenitiesSet = new Set();
    hotels.forEach(hotel => {
      hotel.amenities?.forEach(amenity => amenitiesSet.add(amenity));
    });
    return Array.from(amenitiesSet);
  }, [hotels]);

  // Helper function to calculate average review rating
  const getAverageReviewRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  // Filter and sort hotels
  const filteredAndSortedHotels = useMemo(() => {
    if (!hotels) return [];

    let filtered = [...hotels];

    // Location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter(hotel =>
        selectedLocations.some(loc => 
          hotel.location?.toLowerCase().includes(loc.toLowerCase()) || 
          hotel.city?.toLowerCase().includes(loc.toLowerCase())
        )
      );
    }

    // Price filter
    filtered = filtered.filter(
      hotel => hotel.price >= priceRange.min && hotel.price <= priceRange.max
    );

    // Hotel star rating filter
    if (selectedStars.length > 0) {
      filtered = filtered.filter(hotel => {
        const hotelStars = Math.floor(hotel.rating || 0);
        return selectedStars.includes(hotelStars);
      });
    }

    // Amenities filter
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(hotel =>
        selectedAmenities.every(amenity => hotel.amenities?.includes(amenity))
      );
    }

    // Guest/Hotel rating filter (existing)
    if (minGuestRating > 0) {
      filtered = filtered.filter(hotel => (hotel.rating || 0) >= minGuestRating);
    }

    // CUSTOMER REVIEW RATING FILTER (NEW)
    if (minCustomerRating > 0) {
      filtered = filtered.filter(hotel => {
        const avgReviewRating = getAverageReviewRating(hotel.reviews);
        return avgReviewRating >= minCustomerRating;
      });
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "review-rating-high":
        filtered.sort((a, b) => {
          const avgA = getAverageReviewRating(a.reviews);
          const avgB = getAverageReviewRating(b.reviews);
          return avgB - avgA;
        });
        break;
      case "review-rating-low":
        filtered.sort((a, b) => {
          const avgA = getAverageReviewRating(a.reviews);
          const avgB = getAverageReviewRating(b.reviews);
          return avgA - avgB;
        });
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // featured
        break;
    }

    return filtered;
  }, [
    hotels, 
    selectedLocations, 
    priceRange, 
    sortBy, 
    selectedStars, 
    selectedAmenities, 
    minGuestRating,
    minCustomerRating,
  ]);

  return {
    filteredAndSortedHotels,
    allAmenities,
  };
}