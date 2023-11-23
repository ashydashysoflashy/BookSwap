import React from 'react'
import './Search.css'
import Select from 'react-select'
import Result from './Result'

export default function SearchResults() {
    const optionsSort = [
        { value: 'new', label: 'Posted: newest first' },
        { value: 'old', label: 'Posted: oldest first' },
    ]


  return (
    <div className='results-container'>
        <div className='showing-sort'>
            <div className='show'>Showing 1-40 of 340 results</div>
            <Select options={optionsSort} className="react-select-container-results" classNamePrefix="react-select" placeholder="Sort by" />
        </div>
        <Result/>
        <Result/>
        <Result/>
    </div>
  )
}
