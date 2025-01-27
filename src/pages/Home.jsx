//import React from 'react'
//import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className=" font-bold leading-[1.2] text-[60px] text-center mt-16">
        <span className="text-[#fc5f10] ">
          Discover Your Next Adventure{" "}<br/>
          <span className="bg-[#fc5f10] text-[white] rounded-xl px-1 ">
            With AI
          </span>{" "}
          Powered
          <br />
        </span>
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-gray-500 text-center text-xl">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <Link to={"/createTrip"}>
        <Button>Get Started For Free</Button>
      </Link>
    </div>
  );
};

export default Home;
