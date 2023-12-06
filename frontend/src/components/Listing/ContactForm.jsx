import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import './ContactForm.css';


const ContactForm = ({ ad }) => {
  const { user } = useAuthContext();
  //state to track if email sent was successful
  const [isSuccess, setIsSuccess] = useState(false);
  //state to track 
  const [emailData, setEmailData] = useState({
    senderEmail: '',
    receiverID: '',
    subject: '',
    message: ''
  });

   //use effect that triggers when the user and ad are loaded
   //an email can only be sent on a valid ad and by a user
   //will set the email data to a default state
   useEffect(() => {
    if (user && ad) {
      setEmailData({
        senderEmail: user.email,
        receiverID: ad.user_id,
        subject: 'Hi, I am interested in your ad: ' + ad.title,
        message: ''
      });
    }
  }, [user, ad]);

  
  //function that sets state variable everytime email form is changed
  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  //function to handle clicking the submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({...emailData}); 
  };

  //function that makes an api request to the backend to send an email to the ad creator
  const onFormSubmit = async (emailData) => {
    try {
      //contact the api
      const response = await fetch('http://localhost:4000/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      const result = await response.json();
      //if the api sends a valid response, the email is sent succesfully
      if (response.ok) {
        console.log('Email sent:', result.message);
        // Handle success (e.g., showing a success message)
        setEmailData({
                senderEmail: '',
                receiverID: '',
                subject: '',
                message: ''
            });
            setIsSuccess(true);
      //handle api error
      } else {
        console.error('Failed to send email:', result.error);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsSuccess(false);
    }
  };

  return (
    <div className="description-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="senderEmail">Your Email:</label>
          <input
            type="email"
            name="senderEmail"
            value={emailData.senderEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            name="message"
            value={emailData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
      {isSuccess && <div className="success-message">Email sent successfully!</div>}

    </div>
  );
};

export default ContactForm;
