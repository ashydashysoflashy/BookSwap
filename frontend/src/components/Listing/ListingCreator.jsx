import { React, useState, useEffect } from 'react';
import './ListingDetails.css'
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {useAuthContext} from '../../hooks/useAuthContext'
import {useAdsContext} from '../../hooks/useAdsContext';

export default function ListingCreator({ onContactClick }) {
  const navigate = useNavigate();
  const {user} = useAuthContext();
  const [username, setUsername] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newReport,setNewReport] = useState({user_id:user.id,reason:""});
  const [reportError,setReportError] = useState(null)
  const { dispatch } = useAdsContext();
  const [displayReport, setDisplayReport] = useState();
  const [reportSuccess,setReportSuccess] = useState(false);
  const reportOptions = [
    { value: "prohibited", label: "Prohibited Content" },
    { value: "illegal", label: "Illegal Content" }
  ];
  useEffect(() => {
    // Check if the current user has already reported the ad
    if (ad.reports.some(report => report.user_id === user.id)) {
      setReportSuccess(true)
    } 
  }, [ad, user.id]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the query parameters
        const response = await fetch(`http://localhost:4000/api/user/${ad.user_id}`);
        const data = await response.json();

        if (response.ok) {
          setUsername(data);
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

  const handleReport = async (e) => {
    e.preventDefault();
    if (!displayReport) setDisplayReport(!displayReport);
    setReportError(null)
    if (newReport.reason === ""){
      console.log("return");
      return;
    }
    //Functionality for reporting a listing
    const adData = {
      reports: [...ad.reports,newReport]
    };
    const response = await fetch(`http://localhost:4000/api/ads/report/${ad._id}`, {
      method: "PATCH",
      body: JSON.stringify(adData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const jsonData = await response.json();
    if (!response.ok) {
      setReportError(jsonData.error);
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

      <button className='other-button' onClick = {onViewOtherListingsClick}>View Other Listings </button>
      <button className='contact-button' onClick={onContactClick}>Contact Seller</button>
      {reportSuccess && <p>Your report has been submitted.</p>}
      {!reportSuccess && (ad.user_id !== user.id) && <button className='report-button' onClick={handleReport}>{!displayReport ? 'Report Listing' : 'Report'}</button>}
      {displayReport && newReport.reason === "" && <p id='report_text'>Please input a reason for reporting</p>}
      {reportError && <p id='report_text'>{reportError.message}</p>}
      {displayReport && !reportSuccess ? <Select
        options={reportOptions}
        onChange={(selectedOption) => setNewReport((prev) => ({...prev,reason: selectedOption.value}))}
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
