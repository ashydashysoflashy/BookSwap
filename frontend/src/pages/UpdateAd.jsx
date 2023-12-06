// UpdateAd.jsx
import UpdateAdForm from "../components/UpdateAdForm";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const UpdateAd = () => {
  const { id } = useParams(); // Get the ad ID from the URL
  const [adData, setAdData] = useState(null);
  console.log("here")

  useEffect(() => {
    // Fetch the existing ad data from the server
    const fetchAdData = async () => {
      const response = await fetch(`http://localhost:4000/api/ads/${id}`);
      const ad = await response.json();
      setAdData(ad); // Set the ad data in state
    };

    fetchAdData();
  }, [id]);

  return (
    <div className="create_ad">
      <h1>Update Your Ad</h1>
      <p>Fill in the details below to update your ad.</p>
      {adData && <UpdateAdForm ad={adData} />}
    </div>
  )
}

export default UpdateAd;
