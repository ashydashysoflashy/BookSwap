import React, { useEffect, useState } from "react";
import Select from "react-select";
import ResultItem from './Result'

export default function SearchResults({
  category,
  courseCode,
  includeSwap,
  minPrice,
  maxPrice,
  school,
  searchQuery,
}) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState(null); // default sort option

  //values for sorting search results options
  const optionsSort = [
    { value: "new", label: "Posted: newest first" },
    { value: "old", label: "Posted: oldest first" },
    { value: "low_high", label: "Price: low to high" },
    { value: "high_low", label: "Price: high to low" },
  ];

  //use effect to fetch posts based on search filters
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Construct the database query parameters
        const params = new URLSearchParams({
          category,
          courseCode,
          includeSwap,
          minPrice,
          maxPrice,
          school,
          search: searchQuery,
          sort: sortOption, // Corrected parameter name
        });
        //get the data from the response
        const response = await fetch(`http://localhost:4000/api/ads?${params}`);
        const data = await response.json();
        //set the search results state to the data
        if (response.ok) {
          setResults(data);
         //error handling
        } else {
          throw new Error(data.error || "Failed to fetch results");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    //fetch the data
    fetchData();
  }, [
    category,
    courseCode,
    includeSwap,
    minPrice,
    maxPrice,
    school,
    searchQuery,
    sortOption,
  ]);

  //function to set state depending on which sorting option (price, posted, etc) is selected
  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption.value);
  };

  return (
      <div className="search-results-wrapper">
        <div className="sorting-container">
          <Select
              options={optionsSort}
              value={optionsSort.find(option => option.value === sortOption)}
              onChange={handleSortChange}
              className="react-select-container-results"
              classNamePrefix="react-select"
              placeholder="Sort by"
          />
        </div>
        <div className="results-grid">
          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {results.length > 0 ? (
              results.map(result => <ResultItem key={result._id} ad={result} />)
          ) : (
              <div>No results found.</div>
          )}
        </div>
      </div>
  );
}

