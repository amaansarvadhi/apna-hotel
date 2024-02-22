import { Button, Card, Notification, toast } from "@/components/ui";
import { AccommodationOptions } from "./AccommodationOptions";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  decrementOption,
  incrementOption,
  setDate,
  setDestination,
  setOpenDate,
  setOpenOptions,
} from "@/store/slices/HotelSlice";
import { FaBed, FaCalendarDay, FaPersonBooth } from "react-icons/fa";
import { format } from "date-fns";
import MultiDateRange from "@/components/ui/MultiDateRange";
import { useNavigate } from "react-router-dom";
import { calculateDays, getUser } from "@/utils/CommonFunction/Common";
import { useNotification } from "@/utils/hooks/useNotification";

export const SearchFilter = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const displayNotification = useNotification();
  const { options, date, openOptions, openDate, destination }: any =
    useAppSelector((state) => state.hotels);

  const handleOptions = (name: string, operations: string) => {
    if (operations === "i") {
      dispatch(incrementOption({ name }));
    } else {
      dispatch(decrementOption({ name }));
    }
  };

const handleSearch = () => {
    const validDestinations = ["london", "dubai", "maldives"];

    if (!validDestinations.includes(destination.toLowerCase())) {
      displayNotification(
        destination === ""
          ? "Please Select Destination"
          : "Only 3 Countries Are Available: London, Dubai, Maldives",
        "danger"
      );
      return;
    }

    if (date.length === 0 || calculateDays(date) === 0) {
      displayNotification("Please Select At Least One Day For Date", "danger");
      return;
    }

    const localStorageData = {
      destination: destination,
      date: date,
      options: options,
    };

    const localStorageString = JSON.stringify(localStorageData);
    localStorage.setItem("hotelSearchData", localStorageString);
    navigate("/hotels");
  };

  return (
    <div className="bg-blue-800 text-white flex justify-center relative">
      <div className="w-full max-w-screen-lg flex flex-col justify-between mx-auto mb-32">
        <h3 className="mt-4">A Lifetime Of Dicounts At Apna Booking.com</h3>
        <div className="mt-2">
          <p>
            Get rewarded for your travels - unlock instant savings of 10% or
            more with a free Apna Booking.com
          </p>
        </div>
        <div className="mt-4">
          {!getUser().username && (
            <Button
              size="sm"
              className="text-white font-semibold"
              style={{ background: "#0071c2", border: "none" }}
            >
              Sign in / Register
            </Button>
          )}
          <div
            className=" bg-white flex items-center justify-around py-7 w-full absolute rounded cursor-pointer text-gray-400"
            style={{
              border: "3px solid yellow",
              height: "30px",
              bottom: "-25px",
              maxWidth: "1024px",
            }}
          >
            <div className="flex items-center gap-2">
              <FaBed style={{ fontSize: "19px" }} className="text-gray-400" />
              <input
                className="border-none outline-none cursor-pointer"
                type="text"
                onChange={(e) => {
                  dispatch(setDestination(e.target.value.toLowerCase()));
                }}
                placeholder="Where are you Going?"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarDay
                style={{ fontSize: "16px" }}
                className="text-gray-400"
              />
              <span
                onClick={() => {
                  dispatch(setOpenDate(!openDate));
                  dispatch(setOpenOptions(false));
                }}
              >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (
                <div className="absolute" style={{ top: "60px" }}>
                  <MultiDateRange
                    date={date}
                    onChange={(item: any) => {
                      dispatch(setDate([item.selection]));
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <FaPersonBooth
                style={{ fontSize: "16px" }}
                className="text-gray-400"
              />
              <span
                onClick={() => {
                  dispatch(setOpenOptions(!openOptions));
                  dispatch(setOpenDate(false));
                }}
              >{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
              {openOptions && (
                <div className="max-w-xs absolute" style={{ top: "60px" }}>
                  <Card clickable style={{ width: "210px", padding: "10px" }}>
                    <AccommodationOptions
                      options={options}
                      onChange={handleOptions}
                    />
                  </Card>
                </div>
              )}
            </div>
            <div className="flex items-center ">
              <Button
                className="text-white w-24"
                style={{ backgroundColor: "#076ae2" }}
                size="md"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
