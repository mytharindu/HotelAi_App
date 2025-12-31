import { useState } from "react";
import Hero from "@/components/Hero";
import HotelListings from "@/components/HotelListings";

export default function LandingPage() {
    const [searchMode, setSearchMode] = useState(false);
    const [searchQuery, setSearchRequest] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Clear search function
    const clearSearch = () => {
        setSearchMode(false);
        setSearchRequest("");
        setSearchResults([]);
    };

     return (
    <>
      <Hero
        onAISearch={(results, request) => {
          setSearchMode(true);
          setSearchResults(results);
          setSearchRequest(request);
        }}  
        clearSearch={clearSearch}
        searchMode={searchMode}
      />
      <HotelListings
        searchMode={searchMode}
        searchQuery={searchQuery}
        searchResults={searchResults}
        clearSearch={clearSearch}
      />
    </>
  );
}