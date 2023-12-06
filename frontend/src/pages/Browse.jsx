// Importing necessary React hooks and components
import { useEffect } from "react";
// Cook to access context from ads
import { useAdsContext } from "../hooks/useAdsContext";
// Components for displays ads
import ResultItem from '../components/Search/Result'
// Browse stylesheet import
import './Browse.css'

// Browse functional component
const Browse = () => {
  // Extract ads and dispatch from ads context
  const { ads, dispatch } = useAdsContext();

  // useEffect hook to fetch ads data from the server
  useEffect(() => {
    const fetchAds = async () => {
      // Fetch ads from server
      const response = await fetch("http://localhost:4000/api/ads");
      const json = await response.json();

      // If response is ok, update ads context
      if (response.ok) {
        dispatch({ type: "SET_ADS", payload: json });
      }
    };
    // Call the fetchAds function
    fetchAds();
  }, [dispatch]);

  // Rendering the Browse page
  return (
    <div className='browse-container'>
      <h1>Posts For You</h1>
      <div className="ads-grid">
        {ads && ads.map((ad) => <ResultItem key={ad._id} ad={ad} />)}
      </div>
    </div>
  );
};

// Export component
export default Browse;
