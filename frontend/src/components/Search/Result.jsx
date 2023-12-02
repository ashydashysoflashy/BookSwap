import {React, useState, useEffect} from 'react'
import './Result.css'
import Book1 from '../../assets/book1.jpg'
import { FaRegMessage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { S3 } from "aws-sdk";

export default function ResultItem({ad}) {
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

  const handleClick = () => {
    navigate(`../listings/${ad._id}`)
  }

  return (
    <div className='result-container' onClick={handleClick}>
        <div className='result-image-container'>
          {imageUrls.length > 0 ? (
            imageUrls[0]
          ) : (
            <img
              src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
              alt="Not available"
              className='result-image'
            />
          )}
        </div>
        <div className='result-info'>
          <div className='result-price-message-container'>
            <div className='result-price-mobile'>$50.00</div>
            <div className='result-message-icon'>
              <FaRegMessage color='#97aefd' size={24}/>
            </div>
          </div>
          <div className='result-title'>{ad.title ? (ad.title) : ("No Title") }</div>
          <div className='result-title-mobile'>{ad.title ? (ad.title) : ("No Title") }</div>
          <div className='result-price'>{ad.price ? (`$${ad.price}.00`) : ("Contact For Price") }</div>
          <div className='result-description'>{ad.description}</div>
          <div className='result-location'>
            <div>{ad.location} | {formatDate(ad.createdAt)}</div>
          </div>
        </div>
    </div>
  )
}
