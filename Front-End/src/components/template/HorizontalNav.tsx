/** @format */

import { useEffect } from "react";

// import { useAppDispatch, useAppSelector } from "@/store";
import { addCountryList } from "@/store/slices/base/countrySlice";
// import {
//   GetCurrancy,
//   getAllBusinessType,
//   getAllCategory,
//   getDayTerms,
//   getDeliveryType,
// } from "@/store/slices/global";
import useResponsive from "@/utils/hooks/useResponsive";

import HorizontalMenuContent from "./HorizontalMenuContent";

const HorizontalNav = () => {
  // const dispatch = useAppDispatch();
  // const mode = useAppSelector((state) => state.theme.mode);
  // const userAuthority = useAppSelector((state) => state.auth.user.authority);
  // const pagePermission = useAppSelector(
  //   (state) => state.auth.user.pagePermission
  // );
  // const subPagePermission = useAppSelector(
  //   (state) => state.auth.user.subPagePermission
  // );
  const { larger } = useResponsive();
  // const fetchData = () => {
  //   dispatch(GetCurrancy());
  //   dispatch(getDeliveryType());
  //   dispatch(getDayTerms());
  //   dispatch(getAllCategory());
  //   dispatch(getAllBusinessType());
  // };
  // useEffect(() => {
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      {/* {larger.md && (
        <HorizontalMenuContent
          manuVariant={mode}
          userAuthority={userAuthority}
          pagePermission={pagePermission}
          subPagePermission={subPagePermission}
        />
      )} */}
    </div>
  );
};

export default HorizontalNav;
