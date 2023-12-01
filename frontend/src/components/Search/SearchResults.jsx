import React, { useEffect, useState } from "react";
import AdOverview from "../AdOverview";

export default function SearchResults({
  location,
  courseCode,
  minPrice,
  maxPrice,
  school,
  searchQuery,
  sortOption,
}) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
          sort: sortOption,
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="results-container">
      {results.length > 0 ? (
        results.map((result) => <AdOverview key={result._id} ad={result} />)
      ) : (
        <div>No results found.</div>
      )}
    </div>
  );
}
