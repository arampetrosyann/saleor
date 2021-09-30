import React from 'react';
import clsx from 'clsx';

const styles = `bg-black border whitespace-nowrap  text-white font-semibold py-btn-y px-btn-x text-sm text-base hover:bg-black`

interface Props {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const Button: React.VFC<Props> = ({ onClick, className, children }) => {
  return (
    <button
      className={clsx(styles, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
