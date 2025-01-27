//import * as React from "react";
import { useEffect } from "react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router";


const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate();

  useEffect(() => {
    console.log(user);
  }, [user]);


  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
    onError: (error) => console.log(error),
  });

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
        window.location.reload();
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" alt="logo" />
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <a href="/createTrip">
            <Button vaiant="outline" className="rounded-full">
              + Create Trip
            </Button>
            </a>
            <a href="/myTrip">
            <Button vaiant="outline" className="rounded-full">
              My Trips
            </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent className="grid">
                <Button className="items-center" onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  navigate("/")
                  window.location.reload();
                }}>Logout</Button>
              </PopoverContent>
            </Popover>
            </div>

        ) : (
          <Popover>
            <PopoverTrigger>
              <Button>SignIn</Button>
            </PopoverTrigger>
            <PopoverContent >
              <img  src="/logo.svg" alt="logo" />
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
            </PopoverContent>
          </Popover> 
        )}
      </div>
    </div>
  

  );
};

export default Header;
