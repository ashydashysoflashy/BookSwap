// Importing necessary React hooks and components
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import AdOverview from "../components/AdOverview";
import { useNavigate } from "react-router-dom";

const OtherUserAdsPage = () => {
  // Storing user ID from route parameters
  const [id, setId] = useState();
  // Extract ID
  const { id: routeId } = useParams();
  // Hold ads
  const [ads, setAds] = useState([]);
  // Tracking loading status
  const [isLoading, setIsLoading] = useState(false);
  // Store errors
  const [error, setError] = useState(null);
  // Accessing the user context
  const { user } = useAuthContext();
  const navigate = useNavigate()

  // Set the ID when route changes
  useEffect(() => {
    setId(routeId);
  }, [routeId]);

  // Fetch the ads posted by the user (in the route ID)
  useEffect(() => {
    const fetchAds = async () => {
      // If the id is equal to the user id then go to myads page
      if (id === user.id){
        navigate('../myads')
      }
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:4000/api/ads/user/${routeId}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAds(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && id) {
      fetchAds();
    }
  }, [user, id, navigate, routeId]);

  // Function to handle ad deletion (not implemented for other user ads)
  const handleDeleteAd = () => {
    return null;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Render the page
  return (
    <div className="user-ads-page">
      <h1 className="page-title">User's Ads</h1>
      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error-message">Error: {error}</div>}
      <div className="ads-container">
        {ads.length > 0 ? (
          ads.map((ad) => <AdOverview key={ad._id} ad={ad} creator={false} handleDeleteAd={handleDeleteAd}/>)
        ) : (
          <p className="no-ads-message">You haven't posted any ads yet.</p>
        )}
      </div>
    </div>
  );
};

export default OtherUserAdsPage;
