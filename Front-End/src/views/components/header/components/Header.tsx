
import { HeaderButtonList } from "./HeaderButtonList";
import { SearchFilter } from "../headerActionBar/SearchFilter";

interface Props {
  type?: string;
}

export const Header: React.FC<Props> = ({ type }) => {
  return (
    <>
      <div
        className="bg-blue-800 text-white flex justify-center"
        style={{ paddingBottom: type == "hotelList" ? "20px" : "" }}
      >
        <div className="w-full max-w-screen-lg flex items-center justify-between mx-auto mt-10 ">
          <HeaderButtonList />
        </div>
      </div>
      {type !== "hotelList" && (
        <SearchFilter />
      )}
    </>
  );
};
