//import React from 'react'
/* eslint-disable react/prop-types */

import { Link } from "react-router"
import HotelCard from "./HotelCard"

const Hotels = ({trip}) => {
  return (
    <div>
        <h2 className="font-bold text-xl pt-5">Hotel Recommendation</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3  gap-4 mt-3">
            {trip?.tripData?.travelPlan?.hotels?.map((hotel,index)=>(
                <HotelCard hotel={hotel} key={index}/>
            ))}
        </div>
    </div>
  )
}

export default Hotels