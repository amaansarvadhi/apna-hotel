/** @format */

import classNames from "classnames";
import { motion } from "framer-motion";
import type { MouseEvent } from "react";
import Modal from "react-modal";
import { theme } from "twin.macro";

import CloseButton from "../CloseButton";
import useWindowSize from "../hooks/useWindowSize";

export interface DialogProps extends ReactModal.Props {
  closable?: boolean;
  contentClassName?: string;
  height?: string | number;
  onClose?: (e: MouseEvent<HTMLSpanElement>) => void;
  width?: string | number;
}

const Dialog = (props: DialogProps) => {
  const currentSize = useWindowSize();

  const {
    bodyOpenClassName,
    children,
    className,
    closable = true,
    closeTimeoutMS = 150,
    contentClassName,
    height,
    isOpen,
    overlayClassName,
    portalClassName,
    style,
    width = 520,
    ...rest
  } = props;

  const onCloseClick = (e: MouseEvent<HTMLSpanElement>) => {
    props.onClose?.(e);
  };

  const renderCloseButton = (
    <CloseButton absolute className="ltr:right-6 rtl:left-6" onClick={onCloseClick} />
  );

  const contentStyle = {
    content: {
      inset: "unset",
    },
    ...style,
  };

  if (width !== undefined) {
    contentStyle.content.width = width;

    if (
      typeof currentSize.width !== "undefined" &&
      currentSize.width <=
      parseInt(theme`screens.sm`.split(/ /)[0].replace(/[^\d]/g, ""))
    ) {
      contentStyle.content.width = "auto";
    }
  }
  if (height !== undefined) {
    contentStyle.content.height = height;
  }

  const defaultDialogContentClass = "dialog-content";

  const dialogClass = classNames(defaultDialogContentClass, contentClassName);

  return (
    <Modal
      className={{
        base: classNames("dialog", className as string),
        afterOpen: "dialog-after-open",
        beforeClose: "dialog-before-close",
      }}
      overlayClassName={{
        base: classNames("dialog-overlay", overlayClassName as string),
        afterOpen: "dialog-overlay-after-open",
        beforeClose: "dialog-overlay-before-close",
      }}
      portalClassName={classNames("dialog-portal", portalClassName)}
      bodyOpenClassName={classNames("dialog-open", bodyOpenClassName)}
      ariaHideApp={false}
      isOpen={isOpen}
      style={{ ...contentStyle }}
      closeTimeoutMS={closeTimeoutMS}
      {...rest}
    >
      <motion.div
        className={dialogClass}
        initial={{ transform: "scale(0.9)" }}
        animate={{
          transform: isOpen ? "scale(1)" : "scale(0.9)",
        }}
      >
        {closable && renderCloseButton}
        {children}
      </motion.div>
    </Modal>
  );
};

Dialog.displayName = "Dialog";

export default Dialog;
