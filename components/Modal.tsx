import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  closeIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Modal: React.VFC<ModalProps> = (props) => {
  const { children, onClose, open, closeIcon } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const moveEvent = (event: Event) => {
      event.preventDefault();
    };

    if (open) {
      document.documentElement.style.overflow = "hidden";

      document.addEventListener("touchmove", moveEvent, false);
    }

    return () => {
      document.documentElement.style.removeProperty("overflow");
      document.documentElement.removeEventListener("touchmove", moveEvent);
    };
  }, [open]);

  return mounted ? (
    ReactDOM.createPortal(
      <div
        className={
          open
            ? "fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 z-full"
            : "hidden text-black"
        }
      >
        <div className="left-0 top-0 w-full h-full fixed" onClick={onClose} />
        <div className="fixed top-1/2 left-1/2 bg-white w-full max-w-450 transform -translate-x-1/2 -translate-y-1/2 text-base max-h-90 overflow-x-hidden overflow-y-auto p-5 box-border z-10">
          {closeIcon && (
            <span
              className="absolute top-4 right-4 cursor-pointer"
              onClick={onClose}
            >
              {closeIcon}
            </span>
          )}
          {children}
        </div>
      </div>,
      document.body
    )
  ) : (
    <></>
  );
};
