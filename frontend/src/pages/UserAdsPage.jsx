import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import AdOverview from "../components/AdOverview";
import './UserAdsPage.css';

const UserAdsPage = () => {
  const { user } = useAuthContext();
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:4000/api/ads/user/${user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });

        const data = await response.json();
        setAds(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchAds();
  }, [user]);

  return (
      <div className="user-ads-page">
        <h1 className="page-title">My Ads</h1>
        <p className="user-instruction">View, edit, and manage your posted ads.</p>
        {isLoading && <div className="loading">Loading...</div>}
        {error && <div className="error-message">Error: {error}</div>}
        <div className="ads-container">
          {ads.length > 0 ? (
              ads.map(ad => <AdOverview key={ad._id} ad={ad} />)
          ) : (
              <p className="no-ads-message">You haven't posted any ads yet.</p>
          )}
        </div>
      </div>
  );
};

export default UserAdsPage;
