import React from 'react'

import './ListingDetails.css'
import ListingCreator from './ListingCreator'
import ListingDescription from './ListingDescription'

export default function ListingDetails() {
  return (
    <div className='details-container'>
      <ListingCreator/>
      <ListingDescription/>
    </div>
  )
}
