import { Button } from "@/components/ui";
import { FaBed, FaPlane, FaCar, FaTaxi } from "react-icons/fa";
export const HeaderButtonList = () => {
  const buttons = [
    { label: "Stays", icon: <FaBed className="mr-2" />, border: true },
    { label: "Flights", icon: <FaPlane className="mr-2" /> },
    { label: "Car rentals", icon: <FaCar className="mr-2" /> },
    { label: "Airport taxis", icon: <FaTaxi className="mr-2" /> },
  ];

  return (
    <div className="flex gap-6">
      {buttons.map((button: any, index: any) => (
        <div key={index}>
          <Button
            shape="circle"
            className="text-white"
            size="sm"
            style={{
              background: "#1b3fb0",
              border: !button.border ? "none" : "",
            }}
            icon={button.icon}
          >
            {button.label}
          </Button>
        </div>
      ))}
    </div>
  );
};
