import { Input } from "@/components/ui";
import React, { ChangeEvent } from "react";

interface Props {
  label: string;
  value?: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number";
}

export const HotelListInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <span className="ml-2">{label}</span>
      <Input
        className="w-16 h-7"
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
};
