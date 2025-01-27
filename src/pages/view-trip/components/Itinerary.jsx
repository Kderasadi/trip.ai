//import React from 'react'
/* eslint-disable react/prop-types */

import PlaceCardItem from "./PlaceCardItem";
import { WiDaySunny } from "react-icons/wi";

const Itinerary = ({ trip }) => {
  const daycount = Object.keys(
    trip?.tripData?.travelPlan?.itinerary ?? {}
  ).length;
  const day = Array.from({ length: daycount }, (_, i) => i + 1);
  return (
    <div>
      <h2 className="font-bold text-xl pt-5">Itinerary</h2>

      <div>
        {day.map((dayKey, index) => (
          <div className="mt-4" key={index}>
            <div className="flex items-center gap-2">
              <WiDaySunny size={50} />
              <h3 className="font-bold text-lg"> Day {dayKey}</h3>
            </div>
            <div className=" ml-2 text-sm font-semibold text-red-500">
              <p >
                Best Time to Visit :{" "}
                {
                  trip.tripData.travelPlan.itinerary["day" + dayKey]
                    .bestTimeToVisit
                }
              </p>
              <p>
                Theme :{" "}
                {trip.tripData.travelPlan.itinerary["day" + dayKey].theme}
              </p>
            </div>
            <div className="mt-2">
              {/* This section is a winnnn!! */}
              {trip.tripData.travelPlan.itinerary["day" + dayKey].places.map(
                (place, placeIndex) => (
                  <div className="grid grid-cols-1 mt-1 p-2" key={placeIndex}>
                    <PlaceCardItem place={place} />
                  </div>
                )
              )}
            </div>
          </div>
        ))}{" "}
      </div>
    </div>
  );
};

export default Itinerary;
