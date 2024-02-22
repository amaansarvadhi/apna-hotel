import { Button, Notification, toast } from "@/components/ui";
import {
  fetchRooms,
  setReserveModal,
  updateRoomAvailability,
} from "@/store/slices/HotelSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getHotelSearchDetails, hotelId } from "@/utils/CommonFunction/Common";
import { useNotification } from "@/utils/hooks/useNotification";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Reserve = () => {
  const dispatch = useAppDispatch();
  const [selectedRoom, setSelectedRoom] = useState<any>([]);
  const { hotelRooms } = useAppSelector((state) => state.hotels);
  const displayNotification = useNotification();

  const navigate = useNavigate();

  useEffect(() => {
    const Id: any = hotelId();
    dispatch(fetchRooms(Id));
  }, []);

  const handleSelect = (e: any) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRoom(
      checked
        ? [...selectedRoom, value]
        : selectedRoom?.filter((item: any) => item !== value)
    );
  };

  const isAvailable = (roomNumber: any) => {
    const isFound = roomNumber.unavailableDates.some((date: any) =>
      getHotelSearchDetails().allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleClick = async () => {
    if (selectedRoom.length === 0) {
      displayNotification("Please Select The Room", "danger");
      return;
    }

    try {
      const res: any = await Promise.all(
        selectedRoom.map((roomId: any) =>
          dispatch(updateRoomAvailability(roomId))
        )
      );
      if (res[0].meta.requestStatus === "fulfilled") {
        displayNotification(
          "Your Room had been Booked Successfully",
          "success"
        );
      }
      dispatch(setReserveModal(false));
      navigate("/");
    } catch (err) {
      console.error("Error occurred:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-40 w-screen h-screen">
      <div className="bg-white px-10 py-14 rounded-lg relative">
        <MdCancel
          style={{ fontSize: "20px" }}
          className="absolute top-4 right-4 text-black cursor-pointer"
          onClick={() => {
            dispatch(setReserveModal(false));
          }}
        />
        <span className="font-bold" style={{ fontSize: "16px" }}>
          Select Your Rooms
        </span>
        {hotelRooms.map((item: any) => (
          <div className="flex items-center gap-8 p-4" key={item._id}>
            <div className="flex flex-col gap-2">
              <div className="font-bold">{item.title}</div>
              <div className="font-medium">{item.desc}</div>
              <div style={{ fontSize: "12px" }}>
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="font-bold">{item.price}</div>
            </div>
            <div className="flex flex-wrap gap-1 text-xs text-gray-500">
              {item.roomNumbers.map((roomNumber: any) => (
                <div className="flex flex-col" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    className="cursor-pointer"
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <Button
          style={{ backgroundColor: "#0071c2" }}
          size="sm"
          className="rButton text-white cursor-pointer mt-12  font-large w-full "
          onClick={handleClick}
        >
          Reserve Now!
        </Button>
      </div>
    </div>
  );
};
