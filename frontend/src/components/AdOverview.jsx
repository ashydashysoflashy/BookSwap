import React, { useState, useEffect } from "react";
import { useAdsContext } from "../hooks/useAdsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./AdOverview.css";
import { S3 } from "aws-sdk";

const AdOverview = ({ ad,creator }) => {
  const { dispatch } = useAdsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const s3 = new S3({
        region: process.env.REACT_APP_BUCKET_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
      });

      const urls = await Promise.all(
        ad.files.map((fileName) => {
          const filePath = `images/${fileName}`;
          return s3.getSignedUrlPromise("getObject", {
            Bucket: process.env.REACT_APP_BUCKET_NAME,
            Key: filePath,
            Expires: 60,
          });
        })
      );

      setImageUrls(urls);
    };

    if (ad.files && ad.files.length > 0) {
      fetchImageUrls();
    }
  }, [ad.files]);

  const handleDelete = async () => {
    const response = await fetch("http://localhost:4000/api/ads/" + ad._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_AD", payload: json });
    }
  };

  const handleUpdate = async () => {
    navigate(`../update/${ad._id}`);
  };

  const handleViewAd = () => {
    navigate(`../listings/${ad._id}`);
  };

  // Function to format the date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return (
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " at " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  return (
      <div className="ad_overview">
        <div className="ad_images">
          {imageUrls.length > 0 ? (
              imageUrls.map((url, index) => (
                  <img key={index} src={url} alt={`Content ${index + 1}`} />
              ))
          ) : (
              <img
                  src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
                  alt="Not available"
              />
          )}
        </div>
        <div className="ad_information">
          <h2>{ad.title}</h2>
          <p className="ad_price">{ad.price ? `$${ad.price}.00` : `Trade for ${ad.swapBook}`}</p>
          <p className="ad_description">Description: {ad.description}</p>
          <p>Date Created: {formatDate(ad.createdAt)}</p>
          <div className="ad_actions">
            {<button onClick={handleViewAd}>View Ad Details</button>}
            {creator && <button onClick={handleDelete}>Delete Ad</button>}
            {creator && <button onClick={handleUpdate}>Update Ad</button>}
          </div>
        </div>
      </div>
  );
};

export default AdOverview;
