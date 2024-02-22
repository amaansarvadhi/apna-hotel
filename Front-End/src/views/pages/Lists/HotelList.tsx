import Header from "@/views/components/header";
import NavBar from "@/views/components/navbar";
import React from "react";
import { HotelDetailList } from "./HotelDetailList";

export const HotelList = () => {
  return (
    <div>
      <NavBar />
      <Header type="hotelList" />
      <HotelDetailList/>
    </div>
  );
};
