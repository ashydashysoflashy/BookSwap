import React from 'react'
import '../components/Search/Search.css'
import SearchFilters from '../components/Search/SearchFilters'
import SearchResults from '../components/Search/SearchResults'

export default function SearchPage() {
  return (
    <div className='search-container'>
        <SearchFilters/>
        <SearchResults/>
    </div>
  )
}
