import MultiDateRange from "@/components/ui/MultiDateRange";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchHotelByName,
  setDate,
  setDestination,
  setMaxPrice,
  setMinPrice,
  setOpenDate,
} from "@/store/slices/HotelSlice";
import { Card, Input } from "@/components/ui";
import { HotelListInput } from "./components/HotelListInput";
import SearchItem from "@/views/components/searchItem";
import { Spin } from "antd";
import { getHotelSearchDetails } from "@/utils/CommonFunction/Common";

export const HotelDetailList = () => {
  const { date, options, openDate, minPrice, maxPrice, loading }: any =
    useAppSelector((state) => state.hotels);
  const [click, setClick] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchHotelByName({
        destination: getHotelSearchDetails().destination,
        min: minPrice,
        max: maxPrice,
      })
    );
  }, [click]);

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full flex gap-10" style={{ maxWidth: "1024px" }}>
        <div
          className="bg-yellow-400 rounded-lg"
          style={{
            padding: "10px",
            maxHeight: "500px",
            position: "sticky",
            top: "1rem",
          }}
        >
          <h1 className="text-gray-600 " style={{ fontSize: "20px" }}>
            Search
          </h1>
          <div className="flex flex-col gap-2 mb-4">
            <label>Destination</label>
            <Input
              value={""}
              placeholder={getHotelSearchDetails().destination}
              onChange={(e) => {
                dispatch(setDestination(e.target.value));
              }}
              className="w-64"
              type="text"
            />
          </div>
          <div className="flex flex-col mb-4 gap-2">
            <label>Check-in Date</label>
            <span
              className="bg-white px-1 h-10 items-center cursor-pointer flex w-64"
              onClick={() => {
                dispatch(setOpenDate(!openDate));
              }}
            >{`${format(
              date[0].startDate,
              "MM/dd/yyyy"
            )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
            {openDate && (
              <div className="absolute top-56">
                <MultiDateRange
                  onChange={(item) => {
                    dispatch(setDate([item.selection]));
                  }}
                  minDate={new Date()}
                  date={date}
                />
              </div>
            )}
          </div>
          <div className="mb-2">
            <label>Options</label>
          </div>
          <div>
            <HotelListInput
              label="Min Price (per night)"
              value={minPrice}
              onChange={(e) => {
                dispatch(setMinPrice(e.target.value));
              }}
              type="number"
            />
            <HotelListInput
              label="Max Price (per night)"
              value={maxPrice}
              onChange={(e) => {
                dispatch(setMaxPrice(e.target.value));
              }}
              type="number"
            />
            <HotelListInput
              label="Adult"
              value={options.adult}
              onChange={(e) => {}}
              type="number"
            />
            <HotelListInput
              label="Children"
              value={options.children}
              onChange={(e) => {}}
              type="number"
            />
            <HotelListInput
              label="Room"
              value={options.room}
              onChange={(e) => {}}
              type="number"
            />
            <div className="mt-4">
              <Button
                className="w-64 text-white"
                style={{
                  height: "38px",
                  fontSize: "16px",
                  backgroundColor: "#076ae2",
                }}
                onClick={() => setClick(!click)}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
        {loading ? (
          <Spin className="flex items-center w-full justify-center" />
        ) : (
          <div>
            <SearchItem />
          </div>
        )}
      </div>
    </div>
  );
};
