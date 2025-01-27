//import React from 'react'

import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import UserTripCard from "./components/UserTripCard";

const MyTrip = () => {
  const navigate = useNavigate();
  const [userTrip, setUserTrip] = useState([]);

  useEffect(() => {
    getUserTrips();
  },[]);

  /**
   * Used To Get All User Trips
   * @returns
   */

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
    }

    const q = query(
      collection(db, "TripsInfo"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    setUserTrip([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrip((prevVal) => [...prevVal, doc.data()]);
    });
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-10 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl mb-5">My Trips</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        { userTrip.map((trip,index)=>(
            <UserTripCard key={index} trip={trip}/>
        ))}
    </div>
    </div>

  );
};

export default MyTrip;
