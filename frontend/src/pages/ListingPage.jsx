import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Listing from '../components/Listing/Listing';
import ListingDetails from '../components/Listing/ListingDetails';
import '../components/Listing/Listing.css';
import { useAdsContext } from '../hooks/useAdsContext';
import { S3 } from 'aws-sdk'; // Make sure to import AWS SDK

export default function ListingPage() {
  const [id, setId] = useState();
  const { dispatch } = useAdsContext();
  const { id: routeId } = useParams();
  const [adItem, setAdItem] = useState({
    id: null,
    title: null,
    description: '',
    location: '',
    createdAt: '',
    price: null,
    category: '',
    files: [] // Assuming your ad object has a 'files' field with filenames
  });
  const [imageUrls, setImageUrls] = useState([]); // State to hold the image URLs

  useEffect(() => {
    setId(routeId);
  }, [routeId]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const s3 = new S3({
        region: process.env.REACT_APP_BUCKET_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
      });

      const urls = await Promise.all(adItem.files.map(fileName => { // Use adItem.files
        const filePath = `images/${fileName}`;
        return s3.getSignedUrlPromise('getObject', {
          Bucket: process.env.REACT_APP_BUCKET_NAME,
          Key: filePath,
          Expires: 60
        });
      }));

      setImageUrls(urls);
    };

    if (adItem.files && adItem.files.length > 0) {
      fetchImageUrls();
    }
  }, [adItem.files]); // Depend on adItem.files

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/ads/${id}`);
        if (!response.ok) {
          throw new Error('Ad not found');
        }
        const json = await response.json();
        return json;
      } catch (error) {
        console.error('Error fetching ad:', error);
        return null;
      }
    };

    if (id) {
      (async () => {
        const ad = await fetchAd();
        if (ad) {
          setAdItem(ad); // Set the entire ad object
        } else {
          console.log('ad not found');
          // Redirect to ad not found page or handle accordingly
        }
      })();
    }
  }, [id]);

  return (
    <div className="main-container">
      {adItem.title && <Listing ad={adItem} imageUrls={imageUrls} />}
      {adItem.title && (
        <ListingDetails ad={adItem}/>
      )}
    </div>
  );
}
