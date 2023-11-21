import React from "react";
import "./ListingDetails.css";
import { FaRegEye } from "react-icons/fa";


export default function ListingDescription() {
  return (
    <div className="description-container">
      <div className="description-title">Description</div>
      <div className="description-contents">
        Textbook used in PHIL 399, no highlighting or writing inside.
        <br />
        Some pages are slightly folded but that's all.
        <br/>
        Can only do on-campus exchange
      </div>
      <div className='description-views-container'>
        <FaRegEye color='blue' size={30} />
        <div className='description-views'>20 views</div>
      </div>
    </div>
  );
}
