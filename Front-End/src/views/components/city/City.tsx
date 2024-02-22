import { Spinner } from "@/components/ui";
import { cities } from "@/constants/cityData";
import { fetchHotelListCount } from "@/store/slices/HotelSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";

export const City = () => {
  const { hotelListCount, loading } = useAppSelector((state) => state.hotels);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchHotelListCount());
  }, [dispatch]);

  return (
    <div
      className="w-full grid grid-cols-3 gap-20"
      style={{ maxWidth: "1024px", zIndex: "-1" }}
    >
      {cities.map((city, index) => (
        <div key={index} className="relative text-white">
          <img
            src={city.image}
            alt={city.name}
            style={{ width: "360px" }}
            className="object-cover rounded-lg h-full"
          />
          <div className="absolute bottom-4 left-4">
            <h4>{city.name}</h4>
            <h5>
              <span className="flex gap-2 items-center">
                {loading ? (
                  <Spinner style={{ color: "white" }} />
                ) : (
                  hotelListCount[index]
                )}{" "}
                Properties
              </span>
            </h5>
          </div>
        </div>
      ))}
    </div>
  );
};
