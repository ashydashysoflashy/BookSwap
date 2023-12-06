import React, { useState } from 'react';
import './ListingDetails.css';
import ListingCreator from './ListingCreator';
import ListingDescription from './ListingDescription';
import ContactForm from './ContactForm';

export default function ListingDetails({ ad }) {
  //state to manage showing the email contact form
  const [showContactForm, setShowContactForm] = useState(false);

  //function to change state of showing/not showing email contact form
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
