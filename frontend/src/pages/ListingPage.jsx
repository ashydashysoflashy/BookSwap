// Importing necessary React hooks and components
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { S3 } from 'aws-sdk'; // AWS SDK for handling S3 services
import Listing from '../components/Listing/Listing';
import ListingDetails from '../components/Listing/ListingDetails';
import '../components/Listing/Listing.css';

export default function ListingPage() {
  // State for storing current listing ID
  const [id, setId] = useState();
  // Extracting ID from the route parameters
  const { id: routeId } = useParams();
  // State for the current ad details
  const [adItem, setAdItem] = useState({
    id: null,
    title: null,
    description: '',
    location: '',
    createdAt: '',
    price: null,
    category: '',
    files: [] // Field for storing file names
  });
  const [imageUrls, setImageUrls] = useState([]); // State to hold the image URLs

  // Update the listing ID with the route changes
  useEffect(() => {
    setId(routeId);
  }, [routeId]);

  // Fetch and set the image URL's for the ads
  useEffect(() => {
    const fetchImageUrls = async () => {
      const s3 = new S3({
        region: process.env.REACT_APP_BUCKET_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
      });

      // Map the file name to each URL
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

  // Fetch and set the ad details
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
        }
      })();
    }
  }, [id]);

  // Render the Listing and Listing Details
  return (
    <div className="main-container">
      {adItem.title && <Listing ad={adItem} imageUrls={imageUrls} />}
      {adItem.title && (
        <ListingDetails ad={adItem}/>
      )}
       
    </div>
  );
}
