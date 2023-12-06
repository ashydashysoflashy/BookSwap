import React, { useState } from "react";
import "./Search.css";
import Switch from "react-switch";
import Select from "react-select";
import ReactSlider from "react-slider";
import { tagOptions } from "../tagOptions";
import { universityOptions } from "../universityOptions";
import { categoryOptions } from "../categoryOptions";

export default function SearchFilters({
  setCategory,
  setCourseCode,
  setIncludeSwap,
  setMinPrice,
  setMaxPrice,
  setSchool,
  setSearchQuery,
}) {

  // Replace optionsPrice with min and max price state
  const [minPriceValue, setMinPriceValue] = useState(0);
  const [maxPriceValue, setMaxPriceValue] = useState(500);

  // State for controlling the Select components
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCourseCode, setSelectedCourseCode] = useState(null);
  const [selectedSwapSwitch, setSelectedSwapSwitch] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Fix Slider Price Reset
  const [sliderKey, setSliderKey] = useState(0);

  /* Fix selector layer order */
  const [activeDropdown, setActiveDropdown] = useState('');

  // Handler to clear all filters
  const clearFilters = () => {
    //reset state variables
    setSelectedCourseCode(null);
    setSelectedSchool(null);
    setSearchText('');
    setMinPriceValue(0);
    setMaxPriceValue(500);

    // Update the key to force re-render
    setSliderKey(prevKey => prevKey + 1);

    //reset state variables
    setCategory([]);
    setCourseCode([]);
    setIncludeSwap(true);
    setSelectedSwapSwitch(true);
    setMinPrice(0);
    setMaxPrice(500);

    setSchool('');
    setSearchQuery('');
  };

  //function to determine if a user has set a price for the book
  //or if the user has chosen to "swap" the book with other books instead
  const handleSwitchChange = () => {
    if (selectedSwapSwitch) {
      setSelectedSwapSwitch(!selectedSwapSwitch);
      setIncludeSwap("dont");
    } else {
      setSelectedSwapSwitch(!selectedSwapSwitch);
      setIncludeSwap("include");
    }
  }

  //function to adjust the price filters 
  const onApplyPrice = () => {
    setMinPrice(minPriceValue);
    setMaxPrice(maxPriceValue);
  };

  return (
    <div className="filters-container">
      <div className="filters-title">All Textbooks in Calgary</div>
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
        isClearable
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
        isClearable
      />

      <Select
        value={selectedCategory}
        options={categoryOptions}
        className={`react-select-container ${activeDropdown === 'category' ? 'active-dropdown' : ''}`}
        onMenuOpen={() => setActiveDropdown('category')}
        onMenuClose={() => setActiveDropdown('')}
        classNamePrefix="react-select"
        placeholder="Category"
        onChange={(selectedOption) => {
          setCategory(selectedOption ? selectedOption.value : ''); // Handle deselection
          setSelectedCategory(selectedOption);
        }}
        isClearable
      />

      <label>
        <span>Include Trade Offers</span><br></br>
        <Switch onChange={handleSwitchChange} checked={selectedSwapSwitch} />
      </label>

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
          max={500} // Maximum value of the slider
          onChange={(values) => {
            setMinPriceValue(values[0]);
            setMaxPriceValue(values[1]);
          }}
          className="react-slider-container"
          classNamePrefix="react-slider"
        />
        <button onClick={onApplyPrice} className="apply-price-button">
        Apply Price Range
      </button>
        <button className="clear-filters-button" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}
