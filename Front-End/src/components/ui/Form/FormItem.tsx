/** @format */

import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { forwardRef, ReactNode } from "react";
import { useForm } from "./context";
import type { CommonProps, TypeAttributes } from "../@types/common";
import { useConfig } from "../ConfigProvider";
import { CONTROL_SIZES, LAYOUT } from "../utils/constants";

export interface FormItemProps extends CommonProps {
  asterisk?: boolean;
  errorMessage?: string;
  extra?: string | ReactNode;
  htmlFor?: string;
  invalid?: boolean | "";
  label?: string;
  labelClass?: string;
  labelWidth?: string | number;
  layout?: TypeAttributes.FormLayout;
  size?: TypeAttributes.ControlSize;
  asteriskVal?: boolean;
}

const FormItem = forwardRef<HTMLDivElement, FormItemProps>((props, ref) => {
  const {
    asterisk,
    asteriskVal,
    // demo : asteriskVal
    // asteriskVal={
    //   values.parentId && !errors.parentId ? true : false
    // }

    children,
    className,
    errorMessage,
    extra,
    htmlFor,
    invalid,
    label,
    labelClass,
    labelWidth,
    layout,
    style,
    size,
  } = props;

  const formContext = useForm();
  const { controlSize } = useConfig();

  const formItemLabelHeight = size || formContext?.size || controlSize;
  const formItemLabelWidth = labelWidth || formContext?.labelWidth;
  const formItemLayout = layout || formContext?.layout;

  const getFormLabelLayoutClass = () => {
    switch (formItemLayout) {
      case LAYOUT.HORIZONTAL:
        return label
          ? `h-${CONTROL_SIZES[formItemLabelHeight]} ${
              label && "ltr:pr-2 rtl:pl-2"
            }`
          : "ltr:pr-2 rtl:pl-2";
      case LAYOUT.VERTICAL:
        return `mb-2`;
      case LAYOUT.INLINE:
        return `h-${CONTROL_SIZES[formItemLabelHeight]} ${
          label && "ltr:pr-2 rtl:pl-2"
        }`;
      default:
        break;
    }
  };

  const formItemClass = classNames(
    "form-item",
    "h-auto",
    formItemLayout,
    className,
    invalid ? "invalid" : "",
  );

  const formLabelClass = classNames(
    "form-label",
    "h-2 mt-1",
    label && getFormLabelLayoutClass(),
    labelClass,
    invalid ? "invalid-label" : "", // Apply class for invalid label
  );

  const formLabelStyle = () => {
    if (formItemLayout === LAYOUT.HORIZONTAL) {
      return { ...style, ...{ minWidth: formItemLabelWidth } };
    }

    return { ...style, color: invalid ? "red" : style?.color }; // Change text color for invalid label
  };

  const enterStyle = { opacity: 1, marginTop: 3, bottom: -21 };
  const exitStyle = { opacity: 0, marginTop: -10 };
  const initialStyle = exitStyle;

  return (
    <div ref={ref} className={formItemClass}>
      <label
        htmlFor={htmlFor}
        className={formLabelClass}
        style={formLabelStyle()}
      >
        {label}{" "}
        {asterisk && (
          <span
            className={
              asteriskVal ? `text-green-500  ml-1` : `text-red-500  ml-1`
            }
          >
            *
          </span>
        )}
        {extra && <span>{extra}</span>}
      </label>
      <div
        className={
          formItemLayout === LAYOUT.HORIZONTAL
            ? "w-full flex flex-col justify-center relative"
            : ""
        }
      >
        <div style={{ cursor: "pointer" }}>{children}</div>
        <AnimatePresence mode="wait">
          {invalid && (
            <motion.div
              className="form-explain text-xs "
              initial={initialStyle}
              style={{ bottom: "0" }}
              animate={enterStyle}
              exit={exitStyle}
              transition={{ duration: 0.15, type: "tween" }}
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

FormItem.displayName = "FormItem";

export default FormItem;
