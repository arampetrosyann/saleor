import React from "react";
import clsx from "clsx";

const styles = `bg-transparent whitespace-nowrap border-0 text-white font-semibold py-btn-y px-btn-x text-sm text-base`;

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
  rotate?: number;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button: React.VFC<Props> = ({ onClick, className, children, rotate, disabled, type }) => {
  return (
    <button
      className={clsx(styles, className)}
      onClick={onClick}
      style={!!rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
