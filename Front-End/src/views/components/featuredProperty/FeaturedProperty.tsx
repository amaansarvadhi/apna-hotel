import { fetchFetureProperty } from "@/store/slices/HotelSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button, Spin } from "antd";
import { useEffect } from "react";

export const FeaturedProperty = () => {
  const dispatch = useAppDispatch();
  const { hotelFeatureProperty, loading } = useAppSelector(
    (state) => state.hotels
  );

  useEffect(() => {
    dispatch(fetchFetureProperty());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Spin className="h-64 flex items-center" />
      ) : (
        <div
          className="w-full max-w-screen-xl flex justify-between gap-8"
          style={{ maxWidth: "1024px" }}
        >
          {hotelFeatureProperty.map((property: any, index: any) => (
            <div key={index} className="w-1/4">
              {" "}
              <img
                src={property.photos[0]}
                alt={property.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <span className="block mt-4">{property.name}</span>
              <span className="block">{property.city}</span>
              <span className="block">
                Starting From ${property.cheapestPrice}
              </span>
              <div className="flex items-center gap-2">
                {property.rating && (
                  <>
                    <Button
                      className="text-white px-1 w-8 h-8"
                      style={{ background: "#0d6ae2" }}
                    >
                      {property.rating}
                    </Button>
                    <span>{property.ratingLabel}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
