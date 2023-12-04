import React, { useState } from 'react';
import './ListingDetails.css';
import ListingCreator from './ListingCreator';
import ListingDescription from './ListingDescription';
import ContactForm from './ContactForm';

export default function ListingDetails({ ad }) {
  const [showContactForm, setShowContactForm] = useState(false);

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  return (
    <div className='details-container'>
      <ListingCreator ad={ad} onContactClick={toggleContactForm} />
      <ListingDescription ad={ad}/>
      {showContactForm && <ContactForm ad={ad} />}
    </div>
  );
}
