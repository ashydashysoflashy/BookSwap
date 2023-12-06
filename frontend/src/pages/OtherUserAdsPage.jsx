import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import ResultItem from "../components/Search/Result";
import AdOverview from "../components/AdOverview";
import { useNavigate } from "react-router-dom";

const OtherUserAdsPage = () => {
  const [id, setId] = useState();
  const { id: routeId } = useParams();
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate()

  useEffect(() => {
    setId(routeId);
  }, [routeId]);

  useEffect(() => {
    const fetchAds = async () => {
      console.log(user.id,id)
      //if the id is equal to the user id then go to myads page
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
  }, [user, id]);

  //dont implement this since you cant delete others ads
  const handleDeleteAd = () => {
    return null;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
