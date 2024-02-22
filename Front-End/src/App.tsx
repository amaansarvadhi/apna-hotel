import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/pages/Home";
import HotelList from "./views/pages/Lists";
import Hotel from "./views/pages/Hotel";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./views/pages/Login";
import Register from "./views/pages/Register";

export const App = () => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<HotelList />} />
            <Route path="/hotels/:id" element={<Hotel />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};
