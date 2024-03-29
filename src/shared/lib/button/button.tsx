import React from 'react';
import styles from './button.module.scss';

type Props = {
  children: React.ReactNode;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
  const {
    children,
    loading,
    ...buttonProps
  } = props;

  return (
    <button
      {...buttonProps}
      className={styles.button}
    >
      <div>
        {loading ? "Loading..." : children}
      </div>
    </button>
  );
};
