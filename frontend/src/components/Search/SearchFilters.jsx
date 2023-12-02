import React, { useState } from "react";
import "./Search.css";
import Select from "react-select";
import ReactSlider from "react-slider";
import { tagOptions } from "../tagOptions"; //**Reminder: Use Tag Options for the Course Code
import { universityOptions } from "../universityOptions";

import { IoFilter } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function SearchFilters({
  setLocation,
  setCourseCode,
  setMinPrice,
  setMaxPrice,
  setSchool,
  setSearchQuery,
}) {
  const optionsLocation = [
    { value: "Calgary", label: "Calgary" },
    { value: "Airdrie", label: "Airdrie" },
    { value: "Chestermere", label: "Chestermere" },
  ];

  //These will be retrieved from database later
  const optionsCourseCode = [
    { value: "CPSC599", label: "CPSC 599" },
    { value: "SENG513", label: "SENG 513" },
    { value: "CPSC457", label: "CPSC 457" },
  ];

  const optionsSchool = [
    { value: "uofc", label: "University of Calgary" },
    { value: "mru", label: "Mount Royal University" },
    { value: "sait", label: "SAIT" },
  ];

  // Replace optionsPrice with min and max price state
  const [minPriceValue, setMinPriceValue] = useState(0);
  const [maxPriceValue, setMaxPriceValue] = useState(999); // Assuming 999 is the maximum price

  return (
    <div className="filters-container">
      <div className="filters-title">All Textbooks in Calgary</div>
      <div className="location-post-container">
        <div className="location-post-left">
          <FaMapMarkerAlt size={24} color="black" />
          <Select
            options={optionsLocation}
            className="react-select-container-mobile"
            classNamePrefix="react-select"
            placeholder="Location"
          />
        </div>
        <button className="post-button">Post ad</button>
      </div>
      <input
        className="searchbar"
        type="text"
        placeholder="Search for any textbook"
        onChange={(e) => setSearchQuery(e.target.value)}
      ></input>
      <div className="page-results">Page 1 - 340 results</div>
      <div className="filter-by">
        <div>Filter By</div>
        <IoFilter size={24} color="black" />
      </div>
      <Select
        options={optionsLocation}
        className="react-select-container location-container"
        classNamePrefix="react-select"
        placeholder="Location"
        onChange={(selectedOption) => setLocation(selectedOption.value)}
      />
      <Select
        options={tagOptions}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder="Course Code"
        onChange={(selectedOption) => setCourseCode(selectedOption.value)}
      />

      <Select
        options={universityOptions}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder="School"
        onChange={(selectedOption) => setSchool(selectedOption.value)}
      />
      <div className="filter-item">
        <label>
          Price Range: ${minPriceValue} - ${maxPriceValue}
        </label>
        <ReactSlider
          thumbClassName="example-thumb"
          trackClassName="example-track"
          defaultValue={[0, 999]} // Set initial values
          ariaLabel={["Lower thumb", "Upper thumb"]}
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          renderThumb={(props, state) => <div {...props}></div>}
          pearling
          minDistance={10}
          min={0} // Minimum value of the slider
          max={999} // Maximum value of the slider
          onChange={(values) => {
            setMinPriceValue(values[0]);
            setMaxPriceValue(values[1]);
            setMinPrice(values[0]);
            setMaxPrice(values[1]);
          }}
          className="react-slider-container"
          classNamePrefix="react-slider"
        />
      </div>
    </div>
  );
}
