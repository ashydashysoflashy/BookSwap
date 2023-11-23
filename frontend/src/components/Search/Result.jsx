import React from 'react'
import './Result.css'
import Book1 from '../../assets/book1.jpg'
import Book2 from '../../assets/book2.jpg'
import Book3 from '../../assets/book3.jpg'

export default function ResultItem() {
  return (
    <div className='result-container'>
        <div className='result-image-container'>
          <img className='result-image' src={Book1}/>
        </div>
        <div className='result-info'>
          <div className='result-title'>PHIL 399 Textbook - Good Condition</div>
          <div className='result-price'>$50.00</div>
          <div className='result-description'>Textbook used in PHIL 399, no highlighting or writing inside. Some pages are slightly folder but that's all. Can only do on campus exchange</div>
          <div className='result-location'>University of Calgary | 2 minutes ago</div>
        </div>
    </div>
  )
}
