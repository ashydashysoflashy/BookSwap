import React from 'react'
import './Listing.css'
import { FaMapMarkerAlt } from "react-icons/fa";


export default function Listing({id}) {
  return (
    <div className='listing-container'>
      <div className='listing-directory'>Home &gt; Calgary &gt; Philosophy Textbooks &gt; Under $60</div>
      <div className='listing-title'>PHIL 399 Textbook - Good Condition</div>
      <div className='price-location-container'>
        <div className='listing-price'>$50.00</div>
        <div className='map-icon'>
          <FaMapMarkerAlt color='grey' size={24}/>
        </div>
        <div className='listing-location'>Posted 2 minutes ago, near University of Calgary</div>
        <div className='listing-images-container'>
          
        </div>
      </div>
    </div>
  )
}
