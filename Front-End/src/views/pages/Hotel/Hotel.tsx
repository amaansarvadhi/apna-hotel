import Footer from "@/views/components/footer";
import Header from "@/views/components/header";
import MailList from "@/views/components/mailList";
import NavBar from "@/views/components/navbar";
import React, { useEffect, useState } from "react";
import { Button, Card } from "@/components/ui";
import { MdLocationPin } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  getCurrencySymbol,
  getHotelSearchDetails,
  getUser,
  hotelId,
} from "@/utils/CommonFunction/Common";
import { useNavigate } from "react-router-dom";
import { fetchHotelByName, setReserveModal } from "@/store/slices/HotelSlice";
import { Spin } from "antd";
import Reserve from "@/views/components/reserve";

export const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [singleHotelList, setSingleHotelList] = useState<any>();
  const { loading, reserveModal } = useAppSelector((state) => state.hotels);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOpen = (i: any) => {
    setSlideNumber(i + 1);
    setOpen(true);
  };

  useEffect(() => {
    const getHotel = async () => {
      const res: any = await dispatch(
        fetchHotelByName({
          destination: getHotelSearchDetails().destination,
        })
      );
      const singleHotel = res.payload.find(
        (item: any) => item._id === hotelId()
      );
      setSingleHotelList(singleHotel);
    };
    getHotel();
  }, []);

  const handleMove = (direction: any) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (!getUser().username) {
      navigate("/login");
    } else {
      dispatch(setReserveModal(true));
    }
  };

  return (
    <div>
      <NavBar />
      <Header type="hotelList" />
      <div className="flex flex-col items-center mt-8">
        {open && (
          <div
            className="flex items-center justify-center top-0 left-0"
            style={{
              position: "sticky",
              height: "100vh",
              width: "100vw",
              backgroundColor: "rgba(0, 0, 0, 0.613)",
              zIndex: "999",
            }}
          >
            <IoClose
              className="absolute text-white cursor-pointer"
              style={{
                fontSize: "40px",
                top: "155px",
                right: "450px",
              }}
              onClick={() => setOpen(false)}
            />
            <div
              className="rounded-full bg-white bg-opacity-30 flex items-center justify-center cursor-pointer"
              style={{
                width: "40px",
                height: "40px",
                top: "50%",
                transform: "translateY(-50%)",
                left: "40px",
              }}
              onClick={() => handleMove("l")}
            >
              <FaArrowLeft
                className="text-white"
                style={{ fontSize: "30px" }}
              />
            </div>
            <div className="sliderWrapper h-[60vh]">
              <img
                src={singleHotelList?.photos[slideNumber]}
                alt={`Slide ${slideNumber}`}
                className="object-cover h-full transition-opacity duration-500 ease-in-out"
                style={{ width: "770px" }}
              />
            </div>

            <div
              className="rounded-full bg-white bg-opacity-30 flex items-center justify-center cursor-pointer"
              style={{
                width: "40px",
                height: "40px",
                top: "50%",
                transform: "translateY(-50%)",
                right: "30px",
              }}
              onClick={() => handleMove("r")}
            >
              <FaArrowRight
                className="text-white"
                style={{ fontSize: "30px" }}
              />
            </div>
          </div>
        )}
        <div
          className="w-full flex-col gap-4 relative"
          style={{ maxWidth: "1024px" }}
        >
          <h1 style={{ fontSize: "24px" }}>{singleHotelList?.name}</h1>
          <div className="flex items-center gap-2">
            <MdLocationPin style={{ fontSize: "20px" }} />
            <span>{singleHotelList?.address}</span>
          </div>
          <div className="mt-2 mb-2">
            <span className="text-blue-600 font-semibold ">
              Excellent location – {singleHotelList?.distance} m from center
            </span>
          </div>
          <span className="text-red-600 font-semibold ">
            Book a stay over{" "}
            <span>{getCurrencySymbol(singleHotelList?.city)}</span>
            {singleHotelList?.cheapestPrice} at this property and get a free
            airport taxi
          </span>
          <div className="flex flex-wrap justify-between mt-6">
            {loading ? (
              <div className="h-96 flex justify-center w-full items-center">
                <Spin />
              </div>
            ) : (
              <>
                {singleHotelList?.photos.slice(1).map((photo: any, i: any) => (
                  <div className="" style={{ width: "33%" }} key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt={`Photo ${i + 1}`}
                      className="w-full h-full cursor-pointer object-cover py-1"
                    />
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="flex justify-between" style={{ height: "300px" }}>
            <div className="w-full" style={{ maxWidth: "1024px" }}>
              <h1 style={{ fontSize: "24px" }}>Stay in the heart of City</h1>
              <p className="mt-2" style={{ fontSize: "14px" }}>
                {singleHotelList?.desc}
              </p>
            </div>

            <div
              className="flex  items-center flex-col ml-20 mt-4 text-white py-4 px-2 rounded-lg"
              style={{ backgroundColor: "#ebf3ff" }}
            >
              <h1 style={{ fontSize: "18px", color: "#555" }}>
                Perfect for a {getHotelSearchDetails().days} - night stay!
              </h1>
              <span className="px-3" style={{ color: "#555" }}>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h4 className="text-balck mt-2" style={{ color: "#555" }}>
                <b>
                  <span>{getCurrencySymbol(singleHotelList?.city)}</span>
                  {getHotelSearchDetails().days *
                    singleHotelList?.cheapestPrice *
                    getHotelSearchDetails().options.room}
                </b>{" "}
                ({getHotelSearchDetails().days} nights)
              </h4>
              <Button
                size="sm"
                className="mt-10 text-white"
                style={{ backgroundColor: "#0071c2" }}
                onClick={handleClick}
              >
                Reserve or Book Now!
              </Button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      {reserveModal && <Reserve />}
    </div>
  );
};
