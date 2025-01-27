//import React from 'react'
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData.location) {
      toast({
        description: "Please enter location",
      });
      return;
    }
    if (!formData.noOfDays) {
      toast({
        description: "Please enter trip duration",
      });
      return;
    }
    if (formData.noOfDays < 1) {
      toast({
        description: "Please enter valid duration",
      });
      return;
    }
    if (!formData.budget) {
      toast({
        description: "Please select budget",
      });
      return;
    }
    if (!formData.people) {
      toast({
        description: "Please select number of people",
      });
      return;
    }
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}",formData.location.label)
      .replace("{totalDays}", formData.noOfDays)
      .replace("{people}", formData.people)
      .replace("{budget}", formData.budget)
      .replace("{totalDays}", formData.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    saveTripInfo(result.response.text());
    setLoading(false);
  };

  const saveTripInfo = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "TripsInfo", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user.email,
      id: docId,
    });
    setLoading(false);
    navigate("/viewTrip/" + docId);
  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token= ${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-10 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information,and our trip planner will generate a
        customized itinerary based on your preferences.
      </p>

      <div className="mt-10 mb-10 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your choice of destination?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How long is the trip?
            <span className=" text-gray-500 text-sm"> (in days)</span>
          </h2>
          <Input
            placeholder={"Ex : 3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SelectBudgetOptions.map((item, index) => (
              <div
                onClick={() => handleInputChange("budget", item.title)}
                key={index}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
                  ${
                    formData.budget === item.title
                      ? "bg-[#fd6b22b3] shadow-lg"
                      : ""
                  }
                `}
              >
                <h2 className="text-xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who are you planning with?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
                ${
                  formData.people === item.people
                    ? "bg-[#fd6b22b3] shadow-lg "
                    : ""
                }
                `}
                onClick={() => handleInputChange("people", item.people)}
              >
                <h2 className="text-xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 justify-center flex">
          <Button disabled={loading} onClick={onGenerateTrip}>
            {" "}
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip Plan"
            )}
          </Button>
        </div>

        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" alt="logo" />
                <h2 className="font-bold text-black text-lg mt-7">
                  Sign In With Google
                </h2>
                <p>Sign in to the App with Google Auth securely</p>
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateTrip;
