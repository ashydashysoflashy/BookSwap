import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import AdOverview from "../components/AdOverview";
import './FavoriteAdsPage.css';


const FavoriteAdsPage = () => {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchFavoriteAds = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:4000/api/user/favorites/${user.id}`,
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

    if (user) {
      fetchFavoriteAds();
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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

export default FavoriteAdsPage;
