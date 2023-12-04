import React from 'react'

import './ListingDetails.css'
import ListingCreator from './ListingCreator'
import ListingDescription from './ListingDescription'
import ContactForm from './ContactForm';


export default function ListingDetails({ad}) {
  return (
    <div className='details-container'>
      <ListingCreator ad={ad}/>
      <ListingDescription ad={ad}/>
      <ContactForm ad={ad}/>

    </div>
  )
}
