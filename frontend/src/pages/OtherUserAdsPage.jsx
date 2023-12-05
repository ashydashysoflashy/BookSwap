import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from 'react-router-dom';
import ResultItem from "../components/Search/Result";

const OtherUserAdsPage = () => {
  const [id, setId] = useState();
  const { id: routeId } = useParams();
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    setId(routeId);
  }, [routeId]);

  useEffect(() => {
    const fetchAds = async () => {
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
  }, [user, id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User's Active Listings</h1>
      <div className="ads">
        {ads.map((ad) => (
          <ResultItem key={ad._id} ad={ad} />
        ))}
      </div>
    </div>
  );
};

export default OtherUserAdsPage;
