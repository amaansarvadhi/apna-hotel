import { Button } from "@/components/ui";
import React from "react";

type ChangeHandler = (name: string, operation: string) => void;

interface Props {
  options: string;
  onChange: ChangeHandler;
}

export const AccommodationOptions: React.FC<Props> = ({
  options,
  onChange,
}) => {
  const handleOptionChange = (name: any, operation: any) => {
    onChange(name, operation);
  };
  return (
    <div className="flex flex-col gap-2">
      {Object.entries(options).map(([name, value]: any) => (
        <div key={name} className="flex justify-between">
          <span className="w-12">{name}</span>
          <Button
            disabled={value <= (name === "children" ? 0 : 1)}
            onClick={() => handleOptionChange(name, "d")}
          >
            -
          </Button>
          <span className="flex items-center">{value}</span>
          <Button onClick={() => handleOptionChange(name, "i")}>+</Button>
        </div>
      ))}
    </div>
  );
};
