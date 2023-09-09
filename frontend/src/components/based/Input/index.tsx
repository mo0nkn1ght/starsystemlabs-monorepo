import React, { FC } from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';

interface InputProps {
  // children: ReactNode;
  customClass?: string;
  // disabled?: boolean;
  // secondary?: boolean;
  // gradient?: boolean;
  // loading?: boolean;
  options?: any;
  balance: any;
  ticker?: any;
  inputValue?: any;
  onHandleChange?: any;
  onHandleSelect?: any;
  id?: any;
}

const Button: FC<InputProps> = ({ options, balance, ticker, inputValue, id, onHandleChange, onHandleSelect, customClass }) => {
  const classes = clsx(styles.input, customClass);

  return (
    <div className={classes} style={{ width: '60%', color: 'grey', borderRadius: '10px', border: '1px solid', margin: 'auto' }}>
      <div style={{ width: '100%', display: 'flex' }}>
        {options && (
          <select
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '16px',
              padding: '0 15px',
              flex: 1,
              color: 'grey',
            }}
            value={JSON.stringify(ticker)}
            onChange={(e) => {
              onHandleSelect(id, e.target.value);
            }}
          >
            {options.map((opt: any, index: any) => {
              return (
                <option key={`from${index}`} value={JSON.stringify(opt)}>
                  {opt.name}
                </option>
              );
            })}
          </select>
        )}
        <div
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '14px',
            padding: '10px',
            flex: 3,
            textAlign: 'right',
            color: '#ffc300',
          }}
        >
          {JSON.parse(balance)[ticker.name]} {ticker.name}
        </div>
      </div>
      <div style={{ width: '100%', padding: '5px 10px', display: 'flex' }}>
        <input
          type="text"
          value={inputValue}
          style={{
            fontSize: '18px',
            background: 'transparent',
            border: 'none',
            color: 'lightgrey',
          }}
          onChange={(e) => {
            onHandleChange(id, e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Button;
