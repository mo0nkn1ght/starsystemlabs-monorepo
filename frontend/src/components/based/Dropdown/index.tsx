import clsx from 'clsx';
import React, { FC } from 'react';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';

import styles from './index.module.scss';

interface DropdownProps {
  placeholder: string;
  options: OptionsOrGroups<string, GroupBase<string>>;
  name: string;
  value: string;
  onChange: (val: string | null) => void;
  customClass?: string;
}

const Dropdown: FC<DropdownProps> = ({ placeholder, options, name, value, onChange, customClass }) => {
  return (
    <div
      className={clsx(styles.dropdown, customClass, {
        [styles.selected]: value,
      })}
    >
      <Select
        className="basic-single"
        classNamePrefix="dropdown"
        defaultValue={value}
        isDisabled={false}
        isLoading={false}
        isClearable={true}
        isSearchable={true}
        placeholder={placeholder}
        onChange={(val) => onChange(val)}
        name={name}
        options={options}
      />
    </div>
  );
};

export default Dropdown;
