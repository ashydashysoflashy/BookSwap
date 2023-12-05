import React, { useState } from 'react';
import './ListingDetails.css'
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import Select from 'react-select';

export default function ListingCreator({ ad, onContactClick }) {
  const [report, setReport] = useState(null);
  const [displayReport, setDisplayReport] = useState();

  const reportOptions = [
    { value: "business", label: "Prohibited Content" },
    { value: "computerScience", label: "Illegal Content" }
  ];

  const handleReport = () => {
    if (!displayReport) setDisplayReport(!displayReport);
    else {
      console.log(report);
      if (report === null) document.getElementById("report_text").style.display = "block";
      else {
        //Functionality for reporting a listing
      }
    }
  }

  return (
    <div className='creator-container'>
      <div className='creator-info-container'>

        <div className='creator-left'>
          <FaRegUser size={30} color='grey' />
          <div className='creator-left-inner'>
            <div className='creator-name'>GuyWhoKindaStudies292</div>
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

      <button className='other-button'>View Other Listings</button>
      <button className='contact-button' onClick={onContactClick}>Contact Seller</button>
      <button className='report-button' onClick={handleReport}>{!displayReport ? 'Report Listing' : 'Report'}</button>
      {displayReport ? <Select
        options={reportOptions}
        onChange={(selectedOption) => setReport(selectedOption.value)}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder="Reason for Reporting"
        value={reportOptions.find(
          (option) => option.value === report
        )}
      /> : null}
      <p id='report_text'>Please input a reason for reporting</p>
    </div>

  )
}
