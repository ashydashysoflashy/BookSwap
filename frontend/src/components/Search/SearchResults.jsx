import React, { useEffect, useState } from "react";
import Select from "react-select";
import AdOverview from "../AdOverview";

export default function SearchResults({
  location,
  courseCode,
  minPrice,
  maxPrice,
  school,
  searchQuery,
}) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("new"); // default sort option

  const optionsSort = [
    { value: "new", label: "Posted: newest first" },
    { value: "old", label: "Posted: oldest first" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Construct the query parameters
        const params = new URLSearchParams({
          location,
          courseCode,
          minPrice,
          maxPrice,
          school,
          search: searchQuery,
          sort: sortOption, // Corrected parameter name
        });

        const response = await fetch(`http://localhost:4000/api/ads?${params}`);
        const data = await response.json();

        if (response.ok) {
          setResults(data);
        } else {
          throw new Error(data.error || "Failed to fetch results");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    location,
    courseCode,
    minPrice,
    maxPrice,
    school,
    searchQuery,
    sortOption,
  ]);

  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="results-container">
      <Select
        options={optionsSort}
        value={optionsSort.find((option) => option.value === sortOption)}
        onChange={handleSortChange} // Added onChange handler
        className="react-select-container-results"
        classNamePrefix="react-select"
        placeholder="Sort by"
      />
      {results.length > 0 ? (
        results.map((result) => <AdOverview key={result._id} ad={result} />)
      ) : (
        <div>No results found.</div>
      )}
    </div>
  );
}
