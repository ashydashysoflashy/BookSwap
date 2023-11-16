import { useEffect } from "react";
import { useAdsContext } from "../hooks/useAdsContext";

import AdOverview from '../components/AdOverview';

const Browse = () => {
  const {ads, dispatch} = useAdsContext();

  useEffect(() => {
    const fetchAds = async () => {
      const response = await fetch('http://localhost:4000/api/ads');
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_ADS', payload: json});
      }
    }
    fetchAds();
  }, [dispatch]);

  return (
    <div>
      <div className="ads">
        {ads && ads.map((ad) => (
          <AdOverview key={ad._id} ad={ad}/>
        ))}
      </div>
    </div>
  )
}

export default Browse;