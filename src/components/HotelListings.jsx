import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HotelCard from "@/components/HotelCard";
import { useGetAllHotelsQuery, useGetAllLocationsQuery } from "@/lib/api";
import { Skeleton } from "./ui/skeleton";
import ViewToggle from "./ui/hotels/ViewToggle";
import FilterButton from "./ui/hotels/FilterButton";
import SortDropdown from "./ui/hotels/SortDropdown";
import LocationChips from "./ui/hotels/LocationChips";
import FiltersPanel from "./ui/hotels/FiltersPanel";
import Pagination from "./ui/hotels/Pagination";
import { useURLState } from "@/hooks/useURLState";
import { useFilterState } from "@/hooks/useFilterState";
import { useFilteredHotels } from "@/hooks/useFilteredHotels";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, RefreshCw } from "lucide-react";
import { clearSearch } from "@/lib/features/searchSlice";

function HotelListings() {
  const dispatch = useDispatch();
  const { query, isSearchMode } = useSelector((state) => state.search);
  const itemsPerPage = 12;
  
  // View state
  const [viewMode, setViewMode] = useURLState("view", "grid");
  const [showFilters, setShowFilters] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  
  // Customer rating state
  const [minCustomerRating, setMinCustomerRating] = useState(0);

  // Filter states 
  const {
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
  } = useFilterState();

  // Fetch data
  const {
    data: hotels,
    isLoading: isHotelsLoading,
    isError: isHotelsError,
  } = useGetAllHotelsQuery();

  const {
    data: locations,
    isLoading: isLocationsLoading,
  } = useGetAllLocationsQuery();

  // Get filtered and sorted hotels (normal mode)
  const { filteredAndSortedHotels, allAmenities } = useFilteredHotels({
    hotels,
    selectedLocations,
    priceRange,
    sortBy,
    selectedStars,
    selectedAmenities,
    minGuestRating,
    minCustomerRating, 
  });

  // AI Search filtering
  const searchFilteredHotels = useMemo(() => {
    if (!isSearchMode || !query.trim()) return filteredAndSortedHotels;

    const searchTerms = query.toLowerCase().split(' ');
    
    return filteredAndSortedHotels.filter(hotel => {
      const searchableText = [
        hotel.name,
        hotel.location,
        hotel.description,
        ...(hotel.amenities || []),
      ].join(' ').toLowerCase();

      return searchTerms.some(term => searchableText.includes(term));
    });
  }, [isSearchMode, query, filteredAndSortedHotels]);

  // Use search results if in search mode, otherwise use filtered hotels
  const displayHotels = isSearchMode ? searchFilteredHotels : filteredAndSortedHotels;

  // Pagination
  const totalPages = Math.ceil(displayHotels.length / itemsPerPage);
  const paginatedHotels = displayHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLocations, priceRange, sortBy, selectedStars, selectedAmenities, minGuestRating, minCustomerRating, query, isSearchMode]);

  const filteredLocations = locations?.filter(loc =>
    loc.name.toLowerCase().includes(locationSearch.toLowerCase())
  ) || [];

  const isLoading = isHotelsLoading || isLocationsLoading;

  function handleClearSearch() {
    dispatch(clearSearch());
    setCurrentPage(1);
  }

  if (isLoading) {
    return (
      <section id="hotel-listings" className="px-8 py-8 lg:py-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top trending hotels worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable experience.
          </p>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isHotelsError) {
    return (
      <section id="hotel-listings" className="px-8 py-8 lg:py-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top trending hotels worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable experience.
          </p>
        </div>
        <p className="text-red-500">Error loading hotels data</p>
      </section>
    );
  }

  return (
    <section id="hotel-listings" className="px-8 py-8 lg:py-8">
      {/* Header Section - Only show when NOT in search mode */}
      <AnimatePresence>
        {!isSearchMode && (
          <motion.section
            className="relative mb-16 text-center overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* soft background glow */}
            <div className="absolute inset-0 flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-r from-gray-300/10 via-slate-400/10 to-gray-500/10 rounded-full blur-3xl" />
            </div>

            {/* small animated icon */}
            <motion.div
              className="flex justify-center mb-3"
              initial={{ rotate: -15, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Sparkles className="w-7 h-7 text-slate-500" />
            </motion.div>

            {/* main heading */}
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-800 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight pb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Top Trending Hotels Worldwide
            </motion.h2>

            {/* sub-caption */}
            <motion.p
              className="mt-3 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Discover exceptional stays and timeless hospitality—trusted by travelers around the world.
            </motion.p>

            {/* decorative divider */}
            <motion.div
              className="mt-6 mx-auto h-[3px] w-20 rounded-full bg-gradient-to-r from-slate-700 to-gray-500"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
          </motion.section>
        )}
      </AnimatePresence>

      {/* Search Mode Banner */}
      <AnimatePresence>
        {isSearchMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    AI Search Results
                  </h3>
                  <p className="text-sm text-slate-600">
                    Showing results for: <span className="font-medium">"{query}"</span>
                  </p>
                </div>
              </div>
              <button
                onClick={handleClearSearch}
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-200 transition-colors font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Show All Hotels
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        
        {/* Hide filters button in search mode */}
        {!isSearchMode && (
          <FilterButton
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            activeFiltersCount={activeFiltersCount}
          />
        )}

        <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />

        <div className="ml-auto text-sm text-muted-foreground flex items-center">
          {displayHotels.length} hotels found
        </div>
      </div>

      {/* Location Chips - Hide in search mode */}
      {!isSearchMode && (
        <LocationChips
          selectedLocations={selectedLocations}
          handleLocationToggle={handleLocationToggle}
          setSelectedLocations={setSelectedLocations}
        />
      )}

      {/* Filters Panel - Hide in search mode */}
      {!isSearchMode && (
        <FiltersPanel
          showFilters={showFilters}
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
          locationSearch={locationSearch}
          setLocationSearch={setLocationSearch}
          filteredLocations={filteredLocations}
          handleLocationToggle={handleLocationToggle}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedStars={selectedStars}
          handleStarToggle={handleStarToggle}
          allAmenities={allAmenities}
          selectedAmenities={selectedAmenities}
          handleAmenityToggle={handleAmenityToggle}
          minCustomerRating={minCustomerRating}
          setMinCustomerRating={setMinCustomerRating}
          activeFiltersCount={activeFiltersCount}
          clearAllFilters={clearAllFilters}
        />
      )}

      {/* Hotels Display */}
      {paginatedHotels.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <X className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-xl font-semibold text-slate-900 mb-2">
              {isSearchMode ? "No hotels match your search" : "No hotels found"}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {isSearchMode 
                ? "Try a different search query or browse all hotels"
                : "Try adjusting your filters to see more results"
              }
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            {isSearchMode && (
              <button
                onClick={handleClearSearch}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Show All Hotels
              </button>
            )}
            {!isSearchMode && activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                : "space-y-4"
            }
          >
            {paginatedHotels.map(hotel => (
              <HotelCard key={hotel._id} hotel={hotel} viewMode={viewMode} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </section>
  );
}

export default HotelListings;