import React, { useEffect } from "react";
import { Button } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { setSingleHotelList } from "@/store/slices/HotelSlice";
import { getCurrencySymbol } from "@/utils/CommonFunction/Common";

export const SearchItem = () => {
  const { hotelBySearch } = useAppSelector((state) => state.hotels);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAvailabilityClick = async (hotel: any) => {
    await dispatch(setSingleHotelList(hotel));
    localStorage.setItem("singleHotel", hotel._id);
    navigate(`/hotels/${hotel._id}`);
  };

  return (
    <div>
      {hotelBySearch.map((hotel: any, index: number) => (
        <div
          key={index}
          className="border border-gray-300 p-4 rounded-lg flex justify-between gap-4 mb-20"
        >
          <img
            src={hotel.photos[0]}
            alt={hotel.name}
            className="siImg w-48 h-48 object-cover rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-blue-600 text-lg">{hotel.name}</h1>
            <span className="text-xs">{hotel.distance} from center</span>
            <span className="text-xs bg-green-600 px-2 py-1 w-28 text-white rounded">
              Free airport taxi
            </span>
            <span className="text-xs font-bold">
              Studio Apartment with Air conditioning
            </span>
            <span className="text-xs">
              Entire studio • 1 bathroom • 21m² 1 full bed
            </span>
            <span className="text-xs text-green-600 font-bold">
              Free cancellation
            </span>
            <span className="text-xs text-green-600">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div className="flex justify-between">
              <span className="font-semibold flex items-center">Excellent</span>
              <Button
                style={{ backgroundColor: "#076ae2" }}
                className="bg-blue-900 text-white font-bold"
              >
                {hotel.rating}
              </Button>
            </div>
            <div className="text-right">
              <span className="text-2xl font-semibold flex justify-end">
                <span>
                  <span>{getCurrencySymbol(hotel.city)}</span>
                </span>
                {hotel.cheapestPrice}
              </span>
              <span className="text-xs text-gray-500 ml-1">
                Includes taxes and fees
              </span>
              <Button
                style={{ backgroundColor: "#126ae1" }}
                className="bg-blue-600 text-white py-1 px-1 mt-2 font-bold rounded"
                onClick={() => handleAvailabilityClick(hotel)}
              >
                See availability
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
