// Importing necessary React hooks and components
import { useEffect, useState } from "react";
// Custom hook to access the authentication context
import { useAuthContext } from "../hooks/useAuthContext";
// Component to display an overview of an ad
import AdOverview from "../components/AdOverview";
// Import Stylesheet
import './FavoriteAdsPage.css';

// FavoriteAdsPage functional component
const FavoriteAdsPage = () => {
  // State variables for ads, loading status, and error handling
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Extracting the user object from the authentication context
  const { user } = useAuthContext();

  // useEffect hook to fetch the user's favorite ads
  useEffect(() => {
    const fetchFavoriteAds = async () => {
      // Setting loading status and resetting error
      setIsLoading(true);
      setError(null);

      try {
        // Fetching favorite ads from the server with authorization
        const response = await fetch(
          `http://localhost:4000/api/user/favorites/${user.id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );

        // Error handling (handling non-ok responses)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Setting the ads state with fetched data
        const data = await response.json();
        setAds(data);
      } catch (err) {
        // Error handling
        setError(err.message);
      } finally {
        // Resetting the loading status
        setIsLoading(false);
      }
    };

    // Fetch favorite ads if the user is logged in
    if (user) {
      fetchFavoriteAds();
    }
  }, [user]);

  // Temporary screen render when loading or if there is an error state
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Rendering of the favourite ad page
  return (
    <div className="favorite-ads-page">
      <h1 className="page-title">Favorite Ads</h1>
      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error-message">Error: {error}</div>}
      <div className="ads-container">
        {ads.length > 0 ? (
          ads.map((ad) => <AdOverview key={ad._id} ad={ad} creator={false}/>)
        ) : (
          <p className="no-ads-message">You haven't favorited any ads yet.</p>
        )}
      </div>
    </div>
  );
};

// Export component
export default FavoriteAdsPage;
