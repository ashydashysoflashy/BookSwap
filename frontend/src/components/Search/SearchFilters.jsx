import React from 'react'
import './Search.css'
import Select from 'react-select'
import { IoFilter } from "react-icons/io5";


export default function SearchFilters() {
    const optionsLocation = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

  return (
    <div className='filters-container'>
        <div className='filters-title'>All Textbooks in Calgary</div>
        <div className='filter-by'>
            <div>Filter By</div>
            <IoFilter size={24} color='black'/>
        </div>
        <Select options={optionsLocation}   className="react-select-container" classNamePrefix="react-select" placeholder="Location" />
        <Select options={optionsLocation}   className="react-select-container" classNamePrefix="react-select" placeholder="Course Code" />
        <div>Price Dropdown</div>
        <Select options={optionsLocation}   className="react-select-container" classNamePrefix="react-select" placeholder="School" />
    </div>
  )
}
