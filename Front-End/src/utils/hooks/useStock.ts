/** @format */

import { apiGetMasterData, apiGetStockData } from "@/services/masterServicec";
import { setMaster, setStockList, useAppDispatch } from "@/store";

function useStock() {
  const dispatch = useAppDispatch();

  const getAllMaster = async () => {
    try {
      const resp = await apiGetMasterData();
      dispatch(setMaster(resp.data));
    } catch (errors) {
      return {
        status: "failed",
        message: errors,
      };
    }
  };
  const getAllStock = async () => {
    try {
      const resp = await apiGetStockData();
      dispatch(setStockList(resp.data));
    } catch (errors) {
      return {
        status: "failed",
        message: errors,
      };
    }
  };
  return {
    getAllMaster,
    getAllStock,
  };
}

export default useStock;
