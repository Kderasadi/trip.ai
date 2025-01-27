//import React from 'react'
/* eslint-disable react/prop-types */
import { GetPlaceDetails, PHOTO_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { Link } from "react-router";

const PlaceCardItem = ({place}) => {
    const[PhotoUrl,setPhotoUrl]=useState();
      useEffect(() => {
        place && getPlacePhoto();
      },[place]);
    
      const getPlacePhoto = async () => {
        const data = {
          textQuery: place?.placeName,
        };
        const result = await GetPlaceDetails(data).then(resp => {
          console.log(resp.data.places[0].photos[3].name);
          const PhotoUrl = PHOTO_URL.replace("{NAME}", resp.data.places[0].photos[3].name);
          setPhotoUrl(PhotoUrl);
          console.log(PhotoUrl);
        });
      };
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target="_blank">
    <div className=" rounded-xl border-2 p-2 flex gap-5 hover:scale-105 transition-all hover:shadow-lg cursor-pointer">
        <img src={PhotoUrl?PhotoUrl:"/placeholder.jpg"} className="h-[110px] w-[140px] object-cover rounded-xl" />
        <div className="justify-between flex flex-col my-1">
            <div>
            <h2 className="font-bold text-lg ">{place.placeName}</h2>
            <p className="font-semibold text-gray-800 text-[15px]">{place.placeDetails}</p>
            </div>
            <div className="flex gap-1 items-center" >
            <MdOutlineEmojiTransportation />
            <p className=" text-xs text-gray-500">{place.travelTime}</p>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem