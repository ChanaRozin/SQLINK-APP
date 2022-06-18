import React from 'react';

type Props = {
  children: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  outline?: boolean;
  id?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
  const {
    fullWidth,
    children,
    loading,
    outline = false,
    className,
    id,
    ...buttonProps
  } = props;

  return (
    <button
      {...buttonProps}

      onClick={(e) => {
        if (buttonProps.onClick) {
          buttonProps.onClick(e);
        }
      }}
    >
          <div>
        {loading ? "Loading" : children}
      </div>
    </button>
  );
};
