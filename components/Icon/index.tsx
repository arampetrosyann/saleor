import React from "react";
import classes from "./Icon.module.css";
import clsx from "clsx";

interface IconProps {
  size: number;
  name: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const Icon: React.VFC<IconProps> = ({ size, name, onClick, className }) => (
  <span onClick={onClick} style={{ fontSize: `${size}px` }}
        className={clsx(className, `${classes.icon} ${classes["icon-" + name]}`,"cursor-pointer")} />);

