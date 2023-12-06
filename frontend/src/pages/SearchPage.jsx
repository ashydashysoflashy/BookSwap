import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../components/Search/Search.css";
import SearchFilters from "../components/Search/SearchFilters";
import SearchResults from "../components/Search/SearchResults";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState([]);
  const [courseCode, setCourseCode] = useState([]);
  const [includeSwap, setIncludeSwap] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [school, setSchool] = useState("");
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const [sortOption, setSortOption] = useState("");
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

    return () => window.removeEventListener('resize', handleResize);
  }, [searchParams]);

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
