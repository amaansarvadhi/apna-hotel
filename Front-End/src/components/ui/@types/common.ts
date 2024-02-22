/** @format */

import { addDays, subDays } from "date-fns";
import {
  ReactNode,
  CSSProperties,
  // ElementType
} from "react";

export interface CommonProps {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export type WithProps = CommonProps;

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace TypeAttributes {
  type Size = "lg" | "md" | "sm" | "xs";
  type Shape = "round" | "circle" | "none";
  type Status = "success" | "warning" | "danger" | "info";
  type FormLayout = "horizontal" | "vertical" | "inline";
  type ControlSize = "lg" | "md" | "sm" | "xs";
  type MenuVariant = "light" | "dark" | "themed" | "transparent";
  type Direction = "ltr" | "rtl";
}

export type StepStatus = "complete" | "pending" | "in-progress" | "error";

export type ColorLevel =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;

export const predefinedRangesCommon = [
  {
    label: "yesterday",
    value: addDays(new Date(), -1),
  },
  {
    label: "today",
    value: new Date(),
  },
  {
    label: "Prev Day",
    closeOverlay: false,
    value: (date: number | Date) => {
      return subDays(date, 1);
    },
  },
];
type InputRestrictionParams = {
  type: "typeString" | "typeNumber";
  setFieldValue: (field: string, value: string | number) => void;
  event: React.ChangeEvent<HTMLInputElement>;
  pointAllow?: boolean;
  negativeAllow?: boolean;
};

// export const inputRestriction = ({
//   type,
//   setFieldValue,
//   event,
//   pointAllow = false,
//   negativeAllow = false,
// }: InputRestrictionParams) => {
//   const { value, name } = event?.target;
//   if (value === "") {
//     return setFieldValue(name, "");
//   }
//   if (type === "typeString" && value !== undefined) {
//     const trimmedValue = (value || "").trimStart();
//     setFieldValue(name, trimmedValue);
//   } else if (type === "typeNumber" && typeof value === "string") {
//     const inputValue = (value || "").trimStart();
//     const validNumberRegex = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;
//     if (validNumberRegex.test(inputValue)) {
//       if (!pointAllow && inputValue.includes(".")) {
//         return;
//       }
//       if (!negativeAllow && inputValue.includes("-")) {
//         return;
//       }
//       const numericValue = parseFloat(inputValue);
//       setFieldValue(name, numericValue);
//     } else {
//       console.log("i am else");
//     }
//   } else {
//     // For other types, set the field value without any modifications
//     setFieldValue(name, value);
//   }
// };

// you can use like this
// onChange={(e: any) =>
//   inputRestriction({
//     type: "typeNumber",
//     setFieldValue,
//     event: e,
//     pointAllow: true,
//     negativeAllow: false,
//   })
// }
