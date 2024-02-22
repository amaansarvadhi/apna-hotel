/** @format */

import { getHotelSearchDetails } from "@/utils/CommonFunction/Common";
import ApiService from "./ApiService";


export async function apiGethotelCount<T>() {
  return ApiService.fetchData<T>({
    url: "/hotels/countByCity?cities=dubai,london,maldives",
    method: "get",
  });
}



export async function apiGethotelType<T>() {
  return ApiService.fetchData<T>({
    url: "/hotels/countByType",
    method: "get",
  });
}

export async function apiGetFeatureProperty<T>() {
  return ApiService.fetchData<T>({
    url: "/hotels?featured=true&limit=4",
    method: "get",
  });
}

export async function apiGetHotelByName<T>(destination: string, min?: string, max?: string) { 
  return ApiService.fetchData<T>({
    url: `/hotels?city=${destination}${min ? `&min=${min}` : ''}${max ? `&max=${max}` : ''}`,
    method: "get",
  });
}

export async function apiGetRooms<T>(hotelId: string) { 
  return ApiService.fetchData<T>({
    url: `/hotels/room/${hotelId}`,
    method: "get",
  });
}

export async function apiGetLogin<T>(values: any) {
  return ApiService.fetchData<T>({
    url: '/auth/login',
    method: 'post',
    data: values,
  });
}

export async function apiGetRegister<T>(values: any) {
  return ApiService.fetchData<T>({
    url: '/auth/register',
    method: 'post',
    data: values,
  });
}


export async function apiUpdateRoomAvailability<T>(roomId: string) {
  return ApiService.fetchData<T>({
    url: `/rooms/availability/${roomId}`,
    method: "put",
    data: {
      dates: getHotelSearchDetails().allDates,
    },
  });
}
