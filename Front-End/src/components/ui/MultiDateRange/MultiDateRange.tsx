import React, { FC } from "react";
// @ts-ignore
import { DateRange, DateRangeProps } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Card from "../Card";

interface MultiDateRangeProps {
  date?: DateRangeProps["ranges"];
  onChange?: (item: any) => void;
  minDate?: any;
}

export const MultiDateRange: FC<MultiDateRangeProps> = ({
  date,
  onChange,
  minDate,
}) => {
  const handleDateChange = (item: any) => {
    if (typeof onChange === "function") {
      onChange(item);
    }
  };

  return (
    <div>
      <Card>
        <DateRange
          editableDateInputs={true}
          onChange={handleDateChange}
          moveRangeOnFirstSelection={false}
          ranges={date}
          minDate={minDate}
        />
      </Card>
    </div>
  );
};
