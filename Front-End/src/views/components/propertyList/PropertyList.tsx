import { propertyImages } from "@/constants/propertyData";
import { fetchHotelListtype } from "@/store/slices/HotelSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";

export const PropertyList = () => {
  const { hotelListType } = useAppSelector((state) => state.hotels);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchHotelListtype());
  }, []);

  return (
    <div
      className="w-full max-w-screen-md grid grid-cols-5 gap-5"
      style={{ maxWidth: "1024px" }}
    >
      {propertyImages.map((hotel, index) => {
        const countObj = hotelListType?.find(
          (item: any) =>
            item?.type?.toLowerCase() === hotel?.name?.toLowerCase()
        );
        const count = countObj ? countObj.count : 0;
        return (
          <div
            className="rounded-lg overflow-hidden cursor-pointer"
            key={index}
          >
            <img
              className="w-full h-40 object-cover"
              src={hotel.image}
              alt={hotel.name}
            />
            <div className="p-4">
              <h4
                style={{ fontSize: "16px" }}
                className="text-lg font-semibold text-gray-700"
              >
                {hotel.name}
              </h4>
              <h4
                style={{ fontSize: "12px" }}
                className="text-sm font-light text-gray-600"
              >
                {count} {hotel.name}
              </h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};
