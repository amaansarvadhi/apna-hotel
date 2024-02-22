/** @format */

import {
  apiGetCities,
  apiGetCountry,
} from "@/services/CountriesStateCityService";
import { useAppDispatch } from "@/store";
import { setCountry } from "@/store/slices/base/countrySlice";

function AddKycApi() {
  const dispatch = useAppDispatch();

  const getCountries = async () => {
    try {
      const resp = await apiGetCountry();
      dispatch(setCountry(resp));
    } catch (errors) {
      return {
        status: "failed",
        message: errors,
      };
    }
  };
  const getAllStock = async () => {
    try {
      const resp = await apiGetCities({
        data: {
          stateId: 1,
          countryId: 1,
        },
      });

      // dispatch(setStockList(resp.data));
    } catch (errors) {
      return {
        status: "failed",
        message: errors,
      };
    }
  };
  return {
    getCountries,
    getAllStock,
  };
}

export default AddKycApi;
