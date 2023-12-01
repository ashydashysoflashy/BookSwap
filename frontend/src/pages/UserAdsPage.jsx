import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import AdOverview from "../components/AdOverview"; // Assuming you want to use the same component to display ads

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
        const response = await fetch(
          `http://localhost:4000/api/ads/user/${user.id}`,
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
      fetchAds();
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>My Posts</h1>
      <div className="ads">
        {ads.map((ad) => (
          <AdOverview key={ad._id} ad={ad} />
        ))}
      </div>
    </div>
  );
};

export default UserAdsPage;
