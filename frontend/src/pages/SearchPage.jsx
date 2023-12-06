// Importing necessary React hooks and components
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../components/Search/Search.css";
import SearchFilters from "../components/Search/SearchFilters";
import SearchResults from "../components/Search/SearchResults";

// Component for the search page, which includes filters and results
export default function SearchPage() {
  // Hooks for search parameters and filters
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState([]);
  const [courseCode, setCourseCode] = useState([]);
  const [includeSwap, setIncludeSwap] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [school, setSchool] = useState("");
  // State for the main search query
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [sortOption, setSortOption] = useState("");
  // State to control
  const [showFilters, setShowFilters] = useState(window.innerWidth > 768);
  // Update searchQuery state when URL search param changes
  useEffect(() => {
    // Set search query from URL params
    setSearchQuery(searchParams.get("query") || "");
    const handleResize = () => {
      setShowFilters(window.innerWidth > 768);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listenert
    return () => window.removeEventListener('resize', handleResize);
  }, [searchParams]);

  // Render search page
  return (
    <div className="search-container">
      {/* Show button only on smaller screens */}
      {window.innerWidth <= 768 && (
        <button
          className="filters-toggle-button"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>)}

      {showFilters && (
        <SearchFilters
          setCategory={setCategory}
          setCourseCode={setCourseCode}
          setIncludeSwap={setIncludeSwap}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          setSchool={setSchool}
          setSearchQuery={setSearchQuery}
        />
      )}
      <SearchResults
        category={category}
        courseCode={courseCode}
        includeSwap={includeSwap}
        minPrice={minPrice}
        maxPrice={maxPrice}
        school={school}
        searchQuery={searchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
    </div>
  );
}
