//import React from 'react'
/* eslint-disable react/prop-types */
import { GetPlaceDetails, PHOTO_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const HotelCard = ({ hotel, index }) => {
    const[PhotoUrl,setPhotoUrl]=useState();
      useEffect(() => {
        hotel && getPlacePhoto();
      },[hotel]);
    
      const getPlacePhoto = async () => {
        const data = {
          textQuery: hotel?.hotelName,
        };
        const result = await GetPlaceDetails(data).then(resp => {
          console.log(resp.data.places[0].photos[3].name);
          const PhotoUrl = PHOTO_URL.replace("{NAME}", resp.data.places[0].photos[3].name);
          setPhotoUrl(PhotoUrl);
          console.log(PhotoUrl);
        });
      };
  return (
    <Link
      key={index}
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.hotelName +
        "," +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img src={PhotoUrl?PhotoUrl:"/placeholder.jpg"} className=" rounded-xl h-[180px] w-full object-cover" />
        <div className="my-3 flex flex-col gap-2">
          <h2 className="font-medium">{hotel.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍{hotel.hotelAddress}</h2>
          <h2 className="text-sm">💲{hotel.price}</h2>
          <h2 className="text-sm">⭐{hotel.rating}</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
