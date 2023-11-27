import React, { useState, useEffect } from 'react';
import { useAdsContext } from "../hooks/useAdsContext";
import { useNavigate } from "react-router-dom";
import './AdOverview.css';
import { S3 } from 'aws-sdk';


const AdOverview = ({ ad }) => {
  const { dispatch } = useAdsContext();
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const s3 = new S3({
        region: process.env.REACT_APP_BUCKET_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
      });

      const urls = await Promise.all(ad.files.map(fileName => {
        const filePath = `images/${fileName}`; 
        return s3.getSignedUrlPromise('getObject', {
          Bucket: process.env.REACT_APP_BUCKET_NAME,
          Key: filePath, 
          Expires: 60 
        });
      }));

      setImageUrls(urls);
    };

    if (ad.files && ad.files.length > 0) {
      fetchImageUrls();
    }
  }, [ad.files]);

  const handleDelete = async () => {
    const response = await fetch('http://localhost:4000/api/ads/' + ad._id, {
      method: 'DELETE'
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({type: 'DELETE_AD', payload: json});
    }
  }

  const handleAdClick = () => {
    navigate(`../listings/${ad._id}`)
  };

  return (
    <div className="ad_overview" onClick={handleAdClick}>
      <div className="ad_images">
        {imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Content ${index + 1}`} />
          ))
        ) : (
          <img src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg" alt="Not available" />
        )}
      </div>
      <div className="ad_information">
        <h2>{ad.title}</h2>
        <h3>${ad.price}</h3>
        <h4>{ad.description}</h4>
        <p>{ad.createdAt}</p>
        <button onClick={handleDelete}>Test Delete Ad</button>
      </div>
    </div>
  );
};

export default AdOverview;