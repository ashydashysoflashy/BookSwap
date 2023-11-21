import React from 'react'
import './Listing.css'
import { FaMapMarkerAlt } from "react-icons/fa";
import Book1 from '../../assets/book1.png'
import Book2 from '../../assets/book2.png'
import Book3 from '../../assets/book3.png'


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
      </div>

      <div className='listing-images-container'>
        <div className='images-left'>
          <img className='listing-image' src={Book1} alt='book1'/>
        </div>
        <div className='images-right'>
          <img className='listing-image' src={Book2} alt='book2'/>
          <img className='listing-image' src={Book3} alt='book3'/>
        </div>
      </div>

    </div>
  )
}
