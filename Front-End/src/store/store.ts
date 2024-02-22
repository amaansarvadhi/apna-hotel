import { configureStore, combineReducers, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
// Import other reducers if any
import hotelReducer from './slices/HotelSlice'
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const rootReducer = combineReducers({
  hotels: hotelReducer,
  // Add other reducers here
});

const store = configureStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
