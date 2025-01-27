//import React from 'react'

import { toast } from "@/components/hooks/use-toast";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import Itinerary from "../components/Itinerary";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState();

  const getTripData = async () => {
    const docRef = doc(db, "TripsInfo", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document");
      toast({
        description: "No such document",
      });
    }
  };

  useEffect(() => {
    if (tripId) {
      getTripData();
    }
  }, [tripId]);

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <InfoSection trip={trip} />
      <Hotels trip={trip} />
      <Itinerary trip={trip} />
    </div>
  );
};

export default ViewTrip;
