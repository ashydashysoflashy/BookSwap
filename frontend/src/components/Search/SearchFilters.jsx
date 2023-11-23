import React from 'react'
import './Search.css'
import Select from 'react-select'
import { IoFilter } from "react-icons/io5";


export default function SearchFilters() {
    const optionsLocation = [
        { value: 'Calgary', label: 'Calgary' },
        { value: 'Airdrie', label: 'Airdrie' },
        { value: 'Chestermere', label: 'Chestermere' }
    ]

    //These will be retrieved from database later
    const optionsCourseCode = [
        { value: 'CPSC599', label: 'CPSC 599' },
        { value: 'SENG513', label: 'SENG 513' },
        { value: 'CPSC457', label: 'CPSC 457' }
    ]

    const optionsPrice = [
        { value: '5', label: '$5' },
        { value: '10', label: '$10' },
        { value: '15', label: '$15' }
    ]

    const optionsSchool = [
        { value: 'uofc', label: 'University of Calgary' },
        { value: 'mru', label: 'Mount Royal University' },
        { value: 'sait', label: 'SAIT' }
    ]

  return (
    <div className='filters-container'>
        <div className='filters-title'>All Textbooks in Calgary</div>
        <div className='filter-by'>
            <div>Filter By</div>
            <IoFilter size={24} color='black'/>
        </div>
        <Select options={optionsLocation}   className="react-select-container" classNamePrefix="react-select" placeholder="Location" />
        <Select options={optionsCourseCode} className="react-select-container" classNamePrefix="react-select" placeholder="Course Code" />
        <Select options={optionsPrice}   className="react-select-container" classNamePrefix="react-select" placeholder="Minimum Price" />
        <Select options={optionsPrice}   className="react-select-container" classNamePrefix="react-select" placeholder="Maximum Price" />
        <Select options={optionsSchool}   className="react-select-container" classNamePrefix="react-select" placeholder="School" />
    </div>
  )
}
