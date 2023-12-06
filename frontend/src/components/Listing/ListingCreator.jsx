import { React, useState, useEffect } from 'react';
import './ListingDetails.css'
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useAuthContext } from '../../hooks/useAuthContext'
import { useAdsContext } from '../../hooks/useAdsContext';

export default function ListingCreator({ ad, onContactClick }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [username, setUsername] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newReport, setNewReport] = useState({user_id: null, reason: "" });
  const [reportError, setReportError] = useState(null)
  const { dispatch } = useAdsContext();
  const [displayReport, setDisplayReport] = useState();
  const [reportSuccess, setReportSuccess] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  //values for the report user dropdown
  const reportOptions = [
    { value: "prohibited", label: "Prohibited Content" },
    { value: "illegal", label: "Illegal Content" }
  ];

  //function to redirect to a user's ads page
  const onViewOtherListingsClick = () => {
    navigate(`../userads/${ad.user_id}`)
  };

  //use effect that triggers when ad loads and there is a logged in user
  //gets all the ads a user has favourited
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/user/favorites/${user.id}/${ad._id}`);
        const data = await response.json();
        setIsFavorite(data.isFavorite);
      } catch (error) {
        console.error('Error checking favorite status', error);
      }
    };
    //check if the user has favorited this ad
    if (user && user.id) {
      checkFavoriteStatus();
    }
  }, [user, ad._id]);

  //use effect that triggers on page load if there is a logged in user
  //checks if the user has reported the ad and updates state accordingly
  useEffect(() => {
    if(!user || !user.id) return;
    // Check if the current user has already reported the ad
    if (ad.reports.some(report => report.user_id === user.id)) {
      setReportSuccess(true)
    }
  }, [ad, user]);

  //use effect that gets the username of the creator of the ad on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the query parameters
        const response = await fetch(`http://localhost:4000/api/user/${ad.user_id}`);
        const data = await response.json();
        //update state if response is ok
        if (response.ok) {
          setUsername(data);
        //otherwise handle the errors
        } else {
          throw new Error(data.error || "Failed to fetch results");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [ad]);

  //function to favorite/unfavorite an ad
  const toggleFavorite = async () => {
    //if a user is not logged in, return from the function
    if (!user) {
      alert("Please log in to favorite ads");
      return;
    }
  
    //determine whether to delete (remove favorite) or post (add favorite) and determine which part of api to send request to
    const method = isFavorite ? 'DELETE' : 'POST';
    const url = `http://localhost:4000/api/user/favorites/${method === 'POST' ? 'add' : 'remove'}`;
  
    //try contacting the api
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, // Assuming you're using Bearer tokens
        },
        body: JSON.stringify({ user_id: user.id, ad_id: ad._id })
      });
      //if the api sends a bad response throw an error
      if (!response.ok) {
        throw new Error("Failed to update favorite status");
      }
      //set if the user has favorited the post to the good response from the api
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  };
  
  //function to handle if a user has reported a post
  const handleReport = async (e) => {
    //if there is no user then return
    if(!user) return;
    e.preventDefault();
    //if the user has not displayed the report dropdown, display it
    if (!displayReport) setDisplayReport(!displayReport);
    //if the user has not given a reason to report, return
    if (newReport.reason === "") return;
    setReportError(null)
    //if the report does not have the id of the logged in user, return
    if(!newReport.user_id) return;

    //Functionality for reporting a listing
    //the data sent to the api is the old reports and the new report
    const adData = {
      reports: [...ad.reports, newReport]
    };
    //contact api
    const response = await fetch(`http://localhost:4000/api/ads/report/${ad._id}`, {
      method: "PATCH",
      body: JSON.stringify(adData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const jsonData = await response.json();
    //error handling
    if (!response.ok) {
      setReportError(jsonData.error);
    //update context and set report success
    } else {
      dispatch({ type: "UPDATE_AD", payload: jsonData });
      setReportSuccess(true);
    }

  };

  return (
    <div className='creator-container'>
      <div className='creator-info-container'>
        <div className='creator-left'>
          <FaRegUser size={30} color='grey' />
          <div className='creator-left-inner'>
            <div className='creator-name'>{username ? username : "Unnamed User"}</div>
            <div className='creator-reviews'>
              <IoMdStar size={24} color='#8ba5ff' />
              <IoMdStar size={24} color='#8ba5ff' />
              <IoMdStar size={24} color='#8ba5ff' />
              <IoMdStar size={24} color='#8ba5ff' />
              <IoMdStarOutline size={24} color='#8ba5ff' />
              <div className='creator-rating'>4.5/5</div>
              <div className='creator-num'>	&#40;5 Reviews&#41;</div>
            </div>
          </div>
        </div>

        <div className='creator-right'>
          <IoCheckmarkDoneSharp size={24} color='#8ba5ff' />
          <div className='trusted-text'>Trusted Seller</div>
        </div>
      </div>  
      {user && ad.user_id !== user.id && (
        <button 
          className={isFavorite ? 'favorite-button-after' : 'favorite-button-before'} 
          onClick={toggleFavorite}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      )}
      <button className='other-button' onClick={onViewOtherListingsClick}>View Other Listings </button>
      {user && ad.user_id !== user.id && (
        <button className='contact-button' onClick={onContactClick}>Contact Seller</button>
      )}
      
      {reportSuccess && <p>Your report has been submitted.</p>}
      {!reportSuccess && (user && ad.user_id !== user.id) && <button className='report-button' onClick={handleReport}>{!displayReport ? 'Report Listing' : 'Report'}</button>}
      {displayReport && newReport.reason === "" && <p id='report_text'>Please input a reason for reporting</p>}
      {reportError && <p id='report_text'>{reportError.message}</p>}
      {displayReport && !reportSuccess && user ? <Select
        options={reportOptions}
        onChange={(selectedOption) => setNewReport((prev) => ({ user_id: user.id, reason: selectedOption.value }))}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder="Reason for Reporting"
        value={reportOptions.find(
          (option) => option.value === newReport
        )}
      /> : null}
    </div>

  )
}
