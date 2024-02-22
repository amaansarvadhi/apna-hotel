import { apiGetFeatureProperty, apiGetHotelByName, apiGetLogin, apiGetRegister, apiGetRooms, apiGethotelCount, apiGethotelType, apiUpdateRoomAvailability } from "@/services/HotelService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export interface HotelListState {
  loading : boolean
  user: any
  options : any
  date : any
  destination : string
  openOptions: boolean
  openDate : boolean
  reserveModal : boolean
  singleHotelList : any
  minPrice:string,
  maxPrice : string,
  hotelListCount : any
  hotelListType : any
  hotelBySearch : any
  hotelFeatureProperty : any
  hotelRooms:any
}

export const SLICE_NAME = "hotelList";

export const fetchHotelListCount = createAsyncThunk(
  `${SLICE_NAME}/fetchHotelListCount`,
  async () => {
    const response = await apiGethotelCount();
    return response?.data;
  }
);

export const fetchHotelListtype = createAsyncThunk(
  `${SLICE_NAME}/fetchHotelListtype`,
  async () => {
    const response = await apiGethotelType();
    return response?.data;
  }
);

export const fetchFetureProperty = createAsyncThunk(
  `${SLICE_NAME}/apiGetFeatureProperty`,
  async () => {
    const response = await apiGetFeatureProperty();
    return response?.data;
  }
);

export const fetchHotelByName = createAsyncThunk(
  `${SLICE_NAME}/fetchHotelByName`,
  async ({ destination, min, max }: { destination: any; min?: string; max?: string }) => {
    const response = await apiGetHotelByName(destination, min, max); 
    return response?.data;
  }
);

export const fetchRooms = createAsyncThunk(
  `${SLICE_NAME}/fetchRooms`,
  async ( hotelId : any) => {
    const response = await apiGetRooms(hotelId); 
    return response?.data;
  }
);

export const login = createAsyncThunk(
  `${SLICE_NAME}/login`,
  async ({ values }: { values: any }) => {
    const response = await apiGetLogin(values);
    return response?.data;
  }
);

export const register = createAsyncThunk(
  `${SLICE_NAME}/register`,
  async ({ values }: { values: any }) => {
    const response = await apiGetRegister(values);
    return response?.data;
  }
);

export const updateRoomAvailability = createAsyncThunk(
  "hotelList/updateRoomAvailability",
  async (roomId: string) => {
    const response = await apiUpdateRoomAvailability(roomId);
    return response?.data;
  }
);


const initialState: HotelListState = {
  loading : false,
  user : [],
  options : {
    adult : 1,
    children : 0,
    room : 1,
  },
  date: [{
      startDate: new Date(),
      endDate: new Date(),
      key: "selection", 
  }],
  singleHotelList:[],
  hotelListCount : [],
  hotelListType : [],
  hotelFeatureProperty : [],
  hotelBySearch : [],
  hotelRooms : [],
  destination : '',
  openOptions : false,
  openDate : false,
  reserveModal : false,
  minPrice:'',
  maxPrice : '',
};

const hotelListSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    incrementOption: (state, action) => {
      const { name } = action.payload;
      state.options[name] += 1;
    },
    decrementOption: (state, action) => {
      const { name } = action.payload;
      if (state.options[name] > 0) {
        state.options[name] -= 1;
      }
    },
    setDate:(state, action) => {
        state.date = action.payload
    },
    setDestination:(state, action) => {
        state.destination = action.payload
    },
    setOpenOptions: (state, action) => {
       state.openOptions = action.payload
    },
    setOpenDate: (state, action) => {
        state.openDate = action.payload
    },
    setSingleHotelList: (state, action) => {
      state.singleHotelList = action.payload
  },
  setMinPrice:(state, action) => {
    state.minPrice = action.payload
  },
  setReserveModal:(state, action) => {
    state.reserveModal = action.payload
  },
  setMaxPrice:(state, action) => {
  state.maxPrice = action.payload
 },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRooms.pending, (state) => {
      state.loading = true ;

    });
    builder.addCase(fetchRooms.fulfilled, (state , action) => {
      state.loading = false ;
      state.hotelRooms = action.payload
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true ;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false 
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false 
    });
    builder.addCase(fetchHotelListCount.pending, (state) => {
      state.loading = true ;
    });
    builder.addCase(fetchHotelListCount.fulfilled, (state, action) => {
      state.hotelListCount = action.payload;
      state.loading = false 
    });
    builder.addCase(fetchHotelListtype.pending, (state) => {
      state.loading = true ;
    });
    builder.addCase(fetchHotelListtype.fulfilled, (state, action) => {
      state.hotelListType = action.payload;
      state.loading = false 
    });
    builder.addCase(fetchFetureProperty.pending, (state) => {
      state.loading = true ;
    });
    builder.addCase(fetchFetureProperty.fulfilled, (state, action) => {
      state.hotelFeatureProperty = action.payload;
      state.loading = false 
    });
    builder.addCase(fetchHotelByName.pending, (state) => {
      state.loading = true ;
    });
    builder.addCase(fetchHotelByName.fulfilled, (state, action) => {
      state.hotelBySearch = action.payload;
      state.loading = false 
    });
  }
});

export const { setLoading, setSingleHotelList, incrementOption, setReserveModal, setMinPrice, setMaxPrice,  decrementOption , setDate , setDestination , setOpenOptions , setOpenDate} = hotelListSlice.actions;

export default hotelListSlice.reducer;
