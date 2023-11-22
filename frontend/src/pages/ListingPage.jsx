import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Listing from '../components/Listing/Listing'
import ListingDetails from '../components/Listing/ListingDetails'
import '../components/Listing/Listing.css'

export default function ListingPage() {
  const [id,setId] = useState("")
  const { id: routeId } = useParams();

  //on load get the id from the page parameters
  useEffect(() => {
    setId(routeId)
    //here we would get the mongodb stuff for the listing

  },[routeId])

  return (
    <div className='main-container'>
        <Listing id={id}/>
        <ListingDetails id={id}/>
    </div>
  )
}
