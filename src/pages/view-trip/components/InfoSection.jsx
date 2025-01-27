//import React from 'react'
/* eslint-disable react/prop-types */

import { FaShareAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";


const InfoSection = ({ trip }) => {

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
    <div>
      <img
        src={PhotoUrl?PhotoUrl:"/placeholder.jpg"}
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">
          {trip?.userSelection?.location?.label}
        </h2>
        <div className="flex items-center gap-2">
          <h2 className="p-2 px-3 bg-[#fd6b22b3] rounded-full text-gray-700 text-xs ">
            📅 {trip?.userSelection?.noOfDays} Days
          </h2>
          <h2 className="p-2 px-3 bg-[#fd6b22b3] rounded-full text-gray-700 text-xs ">
            🪙 {trip?.userSelection?.budget} Budget
          </h2>
          <h2 className="p-2 px-3 bg-[#fd6b22b3] rounded-full text-gray-700 text-xs ">
            🧑‍🤝‍🧑 Number of Traveler {trip?.userSelection?.people}
          </h2>
          <Button>
            {" "}
            <FaShareAlt /> Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
