import { useEffect } from "react";
import { useAdsContext } from "../hooks/useAdsContext";
import { useLocation } from "react-router-dom";

import AdOverview from "../components/AdOverview";
import ResultItem from '../components/Search/Result'
import './Browse.css'

const Browse = () => {
  const { ads, dispatch } = useAdsContext();

  useEffect(() => {
    const fetchAds = async () => {
      const response = await fetch("http://localhost:4000/api/ads");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ADS", payload: json });
      }
    };
    fetchAds();
  }, [dispatch]);

  return (
    <div className='browse-container'>
      <h1>Posts For You</h1>
      <div className="ads-grid">
        {ads && ads.map((ad) => <ResultItem key={ad._id} ad={ad} />)}
      </div>
    </div>
  );
};

export default Browse;
