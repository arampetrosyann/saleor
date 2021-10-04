import React from "react";
import clsx from "clsx";

const styles = `bg-transparent whitespace-nowrap border-0 text-white font-semibold py-btn-y px-btn-x text-sm text-base outline-none`;

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
  rotate?: number;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?:React.CSSProperties,
}

export const Button: React.VFC<Props> = ({ onClick, className, children,style, rotate, disabled, type }) => {
  return (
    <button
      className={clsx(styles, className)}
      onClick={onClick}
      style={{     ...style,transform: `rotate(${rotate}deg)` }}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
