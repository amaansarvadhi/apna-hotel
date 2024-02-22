
export function dayDifference(date1:Date, date2:Date) {
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  export const getAllDate  = (startDate: Date, endDate: Date) => {
    const date = new Date(startDate.getTime());
    const dates = [];
    while (date <= endDate) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
}
  
  export function getHotelSearchDetails() {
    const { date, options, destination }:any = JSON.parse(localStorage.getItem("hotelSearchData") || '{}');
    const startDate = new Date(date?.[0]?.startDate || null);
    const endDate = new Date(date?.[0]?.endDate || null);
    const days = dayDifference(startDate, endDate);
    const allDates = getAllDate(startDate , endDate)
    return { days, options, destination, startDate, endDate , allDates};
}

export function getUser () {
    const user:any = JSON.parse(localStorage.getItem('userDetails') || '{}');
    return {email : user.email , username : user.username}
}

export const  calculateDays = (date:any) => {
    const startDate = new Date(date?.[0]?.startDate || null);
    const endDate = new Date(date?.[0]?.endDate || null);
    const days = dayDifference(startDate, endDate);
    return days
}

export function hotelId () {
    const hotelId = localStorage.getItem('singleHotel');
    return hotelId
}

export function getCurrencySymbol(city:any) {
    switch(city) {
        case "maldives":
            return "US$";
        case "london":
            return "£";
        case "dubai":
            return "AED";
        default:
            return "";
    }
}

  