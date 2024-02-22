import { footerLists } from "@/constants/footerList";

export const Footer = () => {
  return (
    <div
      className="w-full mt-4"
      style={{ maxWidth: "1024px", fontSize: "12px" }}
    >
      <div className="w-full flex justify-between mb-10">
        {footerLists.map((list, index) => (
          <ul key={index} className="flex-1 list-none p-0">
            {list.items.map((item, idx) => (
              <li key={idx} className="mb-2 text-blue-600 cursor-pointer">
                <b>{item}</b>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="text-center text-blue-800" style={{ fontSize: "16px" }}>
        Copyright © 2023 Apna Booking.com
      </div>
    </div>
  );
};
