import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import BaseButton, { ButtonProps as BaseButtonProps } from '@material-ui/core/Button';
import BeatLoader from 'react-spinners/BeatLoader';

import styles from './index.module.scss';

interface ButtonProps extends Partial<BaseButtonProps> {
  children: ReactNode;
  customClass?: string;
  disabled?: boolean;
  secondary?: boolean;
  gradient?: boolean;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({ children, disabled, customClass, secondary, gradient, loading, ...props }) => {
  const classes = clsx(
    styles.button,
    { [styles.disabled]: disabled },
    { [styles.secondary]: secondary },
    { [styles.gradient]: gradient },
    { [styles.loading]: loading },
    customClass
  );

  return (
    <BaseButton className={classes} {...props}>
      {loading ? <BeatLoader color="#fff" loading={true} size={8} /> : children}
    </BaseButton>
  );
};

export default Button;
