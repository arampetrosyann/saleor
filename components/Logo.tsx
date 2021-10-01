import clsx from "clsx";
import Link from "next/link";
import React from "react";

const styles = "block max-h-logo h-auto w-auto";

interface LogoProps {
  scroll?: boolean;
  replace?: boolean;
  shallow?: boolean;
  passHref?: boolean | undefined;
  logoWidth?: string;
  link?: boolean;
  children?: React.ReactNode;
  className?: string;
  containerClass?: string;
}

export const Logo: React.VFC<LogoProps> = (props) => {
  const {
    scroll = true,
    replace = false,
    shallow = false,
    link = false,
    passHref,
    logoWidth = "49px",
    containerClass,
    className,
    children,
  } = props;

  if (link) {
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
  } else {
    return (
      <span className={clsx(["inline-block max-w-fit"], containerClass)}>
        <img
          className={clsx(styles, className)}
          src="/ssd.svg"
          width={logoWidth}
          alt="Logo"
        />
        {children}
      </span>
    );
  }
};
