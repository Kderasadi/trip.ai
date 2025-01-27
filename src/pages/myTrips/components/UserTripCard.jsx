//import React from 'react'
/* eslint-disable react/prop-types */

import { GetPlaceDetails, PHOTO_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const UserTripCard = ({trip}) => {
      const[PhotoUrl,setPhotoUrl]=useState();
      useEffect(() => {
        trip && getPlacePhoto();
      },[trip]);
    
      const getPlacePhoto = async () => {
        const data = {
          textQuery: trip?.userSelection?.location?.label,
        };
        const result = await GetPlaceDetails(data).then(resp => {
          console.log(resp.data.places[0].photos[3].name);
          const PhotoUrl = PHOTO_URL.replace("{NAME}", resp.data.places[0].photos[3].name);
          setPhotoUrl(PhotoUrl);
          console.log(PhotoUrl);
        });
      };
  return (
    <Link to={"/viewTrip/"+trip?.id}>
    <div className="hover:scale-105 transition-all ">
        <img src={PhotoUrl?PhotoUrl:"/placeholder.jpg"}  className="h-[340px] w-full object-cover rounded-xl"/>
        <div>
            <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
            <h2 className="text-gray-500 text-sm">{trip?.userSelection?.noOfDays} Days Trip With {trip?.userSelection?.budget} Budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCard