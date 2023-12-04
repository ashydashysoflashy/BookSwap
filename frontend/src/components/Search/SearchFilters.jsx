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
  const [maxPriceValue, setMaxPriceValue] = useState(999);

    // State for controlling the Select components
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedCourseCode, setSelectedCourseCode] = useState(null);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [searchText, setSearchText] = useState('');

    // Fix Slider Price Reset
    const [sliderKey, setSliderKey] = useState(0);

    /* Fix selector layer order */
    const [activeDropdown, setActiveDropdown] = useState('');



    // Handler to clear all filters
    const clearFilters = () => {
        setSelectedLocation(null);
        setSelectedCourseCode(null);
        setSelectedSchool(null);
        setSearchText('');
        setMinPriceValue(0);
        setMaxPriceValue(999);

        // Update the key to force re-render
        setSliderKey(prevKey => prevKey + 1);

        setLocation('');
        setCourseCode([]);
        setMinPrice(0);
        setMaxPrice(999);

        setSchool('');
        setSearchQuery('');
    };


    return (
    <div className="filters-container">
      <div className="filters-title">All Textbooks in Calgary</div>
        {/*<div className="location-post-container">
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
      </div>*/}
        <input
            value={searchText}
            className="searchbar"
            type="text"
            placeholder="Search for any textbook"
            onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchText(e.target.value);
            }}
        />
        {/*<div className="page-results">Page 1 - 340 results</div>
      <div className="filter-by">
        <div>Filter By</div>
        <IoFilter size={24} color="black" />
      </div>*/}
        <Select
            value={selectedLocation}
            options={optionsLocation}
            className={`react-select-container ${activeDropdown === 'location' ? 'active-dropdown' : ''}`}
            onMenuOpen={() => setActiveDropdown('location')}
            onMenuClose={() => setActiveDropdown('')}
            classNamePrefix="react-select"
            placeholder="Location"
            onChange={(selectedOption) => {
                setLocation(selectedOption ? selectedOption.value : ''); // Handle deselection
                setSelectedLocation(selectedOption);
            }}
        />

        <Select
            value={selectedCourseCode}
            options={tagOptions}
            className={`react-select-container ${activeDropdown === 'courseCode' ? 'active-dropdown' : ''}`}
            onMenuOpen={() => setActiveDropdown('courseCode')}
            onMenuClose={() => setActiveDropdown('')}
            classNamePrefix="react-select"
            placeholder="Course Code"
            onChange={(selectedOption) => {
                setCourseCode(selectedOption ? selectedOption.value : ''); // Handle deselection
                setSelectedCourseCode(selectedOption);
            }}
        />

        <Select
            value={selectedSchool}
            options={universityOptions}
            className={`react-select-container ${activeDropdown === 'school' ? 'active-dropdown' : ''}`}
            onMenuOpen={() => setActiveDropdown('school')}
            onMenuClose={() => setActiveDropdown('')}
            classNamePrefix="react-select"
            placeholder="School"
            onChange={(selectedOption) => {
                setSchool(selectedOption ? selectedOption.value : ''); // Handle deselection
                setSelectedSchool(selectedOption);
            }}
        />

      <div className="filter-item">
        <label>
          Price Range: ${minPriceValue} - ${maxPriceValue}
        </label>
        <ReactSlider
            key={sliderKey} // Use the key here
          thumbClassName="example-thumb"
          trackClassName="example-track"
            value={[minPriceValue, maxPriceValue]}
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
          <button className="clear-filters-button" onClick={clearFilters}>
              Clear Filters
          </button>
      </div>
    </div>
  );
}
