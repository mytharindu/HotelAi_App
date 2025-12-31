import { useState, useEffect } from "react";
import { useURLState } from "./useURLState";

export function useFilterState() {
  // Filter states with URL persistence
  const [selectedLocations, setSelectedLocations] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const locations = params.get("locations");
    return locations ? locations.split(",") : [];
  });
  
  const [priceRange, setPriceRange] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      min: Number(params.get("minPrice")) || 0,
      max: Number(params.get("maxPrice")) || 1000,
    };
  });
  
  const [sortBy, setSortBy] = useURLState("sort", "featured");
  
  const [selectedStars, setSelectedStars] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const stars = params.get("stars");
    return stars ? stars.split(",").map(Number) : [];
  });
  
  const [selectedAmenities, setSelectedAmenities] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const amenities = params.get("amenities");
    return amenities ? amenities.split(",") : [];
  });
  
  const [minGuestRating, setMinGuestRating] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get("guestRating")) || 0;
  });
  
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get("page")) || 1;
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedLocations.length > 0) params.set("locations", selectedLocations.join(","));
    if (priceRange.min > 0) params.set("minPrice", priceRange.min.toString());
    if (priceRange.max < 1000) params.set("maxPrice", priceRange.max.toString());
    if (sortBy !== "featured") params.set("sort", sortBy);
    if (selectedStars.length > 0) params.set("stars", selectedStars.join(","));
    if (selectedAmenities.length > 0) params.set("amenities", selectedAmenities.join(","));
    if (minGuestRating > 0) params.set("guestRating", minGuestRating.toString());
    if (currentPage > 1) params.set("page", currentPage.toString());
    
    const newURL = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, "", newURL);
  }, [selectedLocations, priceRange, sortBy, selectedStars, selectedAmenities, minGuestRating, currentPage]);

  const handleLocationToggle = (locationName) => {
    setSelectedLocations(prev =>
      prev.includes(locationName)
        ? prev.filter(loc => loc !== locationName)
        : [...prev, locationName]
    );
  };

  const handleStarToggle = (star) => {
    setSelectedStars(prev =>
      prev.includes(star) ? prev.filter(s => s !== star) : [...prev, star]
    );
  };

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const clearAllFilters = () => {
    setSelectedLocations([]);
    setPriceRange({ min: 0, max: 1000 });
    setSelectedStars([]);
    setSelectedAmenities([]);
    setMinGuestRating(0);
    setSortBy("featured");
    setCurrentPage(1);
  };

  const activeFiltersCount = 
    selectedLocations.length + 
    (priceRange.min > 0 || priceRange.max < 1000 ? 1 : 0) +
    selectedStars.length +
    selectedAmenities.length +
    (minGuestRating > 0 ? 1 : 0);

  return {
    selectedLocations,
    setSelectedLocations,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    selectedStars,
    setSelectedStars,
    selectedAmenities,
    setSelectedAmenities,
    minGuestRating,
    setMinGuestRating,
    currentPage,
    setCurrentPage,
    activeFiltersCount,
    clearAllFilters,
    handleLocationToggle,
    handleStarToggle,
    handleAmenityToggle,
  };
}