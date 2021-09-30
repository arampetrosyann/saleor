import React from "react";
import Link from "next/link";
import clsx from "clsx";

const styles = "block max-h-logo h-auto w-auto";

interface LogoProps {
  scroll?: boolean;
  replace?: boolean;
  shallow?: boolean;
  passHref?: boolean | undefined;
  logoWidth?: string;
  children?: React.ReactNode;
  className?: string;
  containerClass?: string;
}

export const Logo: React.VFC<LogoProps> = (props) => {
  const {
    scroll = true,
    replace = false,
    shallow = false,
    passHref,
    logoWidth = "49px",
    containerClass,
    className,
    children,
  } = props;

  return (
    <Link
      href={"/"}
      scroll={scroll}
      replace={replace}
      shallow={shallow}
      passHref={passHref}
    >
      <a>
        <span className={clsx(["inline-block max-w-fit"], containerClass)}>
          <img
            className={clsx(styles, className)}
            src="/ssd.svg"
            width={logoWidth}
            alt="Logo"
          />
          {children}
        </span>
      </a>
    </Link>
  );
};
