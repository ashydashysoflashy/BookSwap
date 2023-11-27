import React from 'react'
import './Result.css'
import Book1 from '../../assets/book1.jpg'
import { FaRegMessage } from "react-icons/fa6";


export default function ResultItem() {
  return (
    <div className='result-container'>
        <div className='result-image-container'>
          <img className='result-image' src={Book1}/>
        </div>
        <div className='result-info'>
          <div className='result-price-message-container'>
            <div className='result-price-mobile'>$50.00</div>
            <div className='result-message-icon'>
              <FaRegMessage color='#97aefd' size={24}/>
            </div>
          </div>
          <div className='result-title'>PHIL 399 Textbook - Good Condition</div>
          <div className='result-title-mobile'>PHIL 399 Textbook - Good Condition</div>
          <div className='result-price'>$50.00</div>
          <div className='result-description'>Textbook used in PHIL 399, no highlighting or writing inside. Some pages are slightly folder but that's all. Can only do on campus exchange</div>
          <div className='result-location'>University of Calgary | 2 minutes ago</div>
        </div>
    </div>
  )
}
