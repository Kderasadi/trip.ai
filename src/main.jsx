//import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app";
import CreateTrip from "./pages/createTrip";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/toaster"
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./pages/view-trip/[tripId]";
import MyTrip from "./pages/myTrips/MyTrip";


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/createTrip" element={<CreateTrip />} />
        <Route path="/viewTrip/:tripId" element={<ViewTrip />} />
        <Route path="/myTrip" element={<MyTrip />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </GoogleOAuthProvider>
);
