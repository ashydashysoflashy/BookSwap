import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../components/Search/Search.css";
import SearchFilters from "../components/Search/SearchFilters";
import SearchResults from "../components/Search/SearchResults";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState("");
  const [courseCode, setCourseCode] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [school, setSchool] = useState("");
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const [sortOption, setSortOption] = useState("");
  // Update searchQuery state when URL search param changes
  useEffect(() => {
    setSearchQuery(searchParams.get("query") || "");
  }, [searchParams]);
  return (
    <div className="search-container">
      <SearchFilters
        setLocation={setLocation}
        setCourseCode={setCourseCode}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        setSchool={setSchool}
        setSearchQuery={setSearchQuery}
      />
      <SearchResults
        location={location}
        courseCode={courseCode}
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
