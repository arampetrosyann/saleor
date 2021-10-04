import React from "react";
import classes from "./Icon.module.css";
import clsx from "clsx";

interface IconProps {
  size: number;
  name: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?:React.CSSProperties;
}

export const Icon: React.VFC<IconProps> = ({ size, name, onClick, className,style }) => (
  <span onClick={onClick} style={{...style, fontSize: `${size}px` }}
        className={clsx(className, `${classes.icon} ${classes["icon-" + name]}`,"cursor-pointer")} />);

