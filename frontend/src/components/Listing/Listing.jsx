import React, { useEffect } from 'react'
import './Listing.css'
import { FaMapMarkerAlt } from "react-icons/fa";
import Book1 from '../../assets/book1.jpg'
import Book2 from '../../assets/book2.jpg'
import Book3 from '../../assets/book3.jpg'
import { FaRegHeart, FaRegFlag } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";





export default function Listing({ad, imageUrls}) {
  useEffect(() => {
  },[])

  return (
    <div className='listing-container'>

      <div className='listing-directory'>Home &gt; Calgary &gt; Philosophy Textbooks &gt; Under $60</div>

      <div className='listing-title'>{ad.title}</div>

      <div className='price-location-container'>
        <div className='listing-price'>{`$${ad.price}.00`}</div>
        <div className='map-icon'>
          <FaMapMarkerAlt color='grey' size={24}/>
        </div>
        <div className='listing-location'>Posted 2 minutes ago, near University of Calgary</div>
      </div>

      <div className='listing-action-menu'>
        <div>
          <FaRegHeart size={30}/>
        </div>
        <div>
          <FaRegFlag size={30}/>
        </div>
        <div>
          <FaRegMessage size={30}/>
        </div>
        <div>
          <MdOutlineEmail size={30}/>
        </div>
      </div>

      <div className='listing-images-container'>
        {imageUrls && imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <img key={index} className='listing-image' src={url} alt={`Content ${index + 1}`} />
          ))
        ) : (
          // Placeholder image if there are no image URLs
          <img src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg" alt="Not available" />
        )}
      </div>

    </div>
  )
}
