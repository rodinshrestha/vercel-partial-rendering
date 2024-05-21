import React from 'react';

import clsx from 'clsx';
import dynamic from 'next/dynamic';

import Label from '@/core/components/FormField/Label';
import Loader from '@/core/components/Loader';

import DropdownIndicator from './DropdownIndicator';
import { StyledDiv } from './style';

const Select = dynamic(() => import('react-select'), { ssr: false });

type Value = string | number;
interface Option {
  readonly id?: Value;
  readonly label: Value | JSX.Element;
  readonly value: Value;
  // TODO fix type
  readonly props?: any;
}

type DropDown = {
  name: string;
  options: Array<Option>;
  // TODO fix type
  onChange?: (e: any) => void;
  label?: string | null;
  touched?: boolean;
  error?: boolean;
  className?: string;
  multiple?: boolean;
  value?: string | number | any;
  processing?: boolean;
  loaderClassName?: string;
  isClearable?: boolean;
  closeMenuOnSelect?: boolean;
  components?: object;
  placeholder?: string;
  hideSelectedOptions?: boolean;
  isSearchable?: boolean;
  menuPlacement?: 'top' | 'bottom';
  menuIsOpen?: boolean;
  defaultValue?: string;
  maxMenuHeight?: number;
  errorMsg?: string;
  loader?: boolean;
  classNamePrefix?: string;
  disabled?: boolean;
  rounded?: string | number;
  // TODO fix type
  onBlur?: (e: any) => void;
};

const SelectField = ({
  name,
  options,
  onChange,
  label,
  touched,
  error,
  className,
  multiple = false,
  value,
  processing,
  loaderClassName,
  closeMenuOnSelect,
  components,
  isClearable = false,
  placeholder,
  hideSelectedOptions,
  isSearchable = true,
  menuPlacement,
  menuIsOpen,
  defaultValue,
  maxMenuHeight,
  errorMsg,
  loader,
  classNamePrefix,
  onBlur,
  rounded = 0,
  disabled,
}: DropDown) => {
  const hasError = error && touched;
  const isError = error && touched;
  // TODO fix type
  const [targetElement, setTargetElement] = React.useState<any>(null);

  React.useEffect(() => {
    setTargetElement(document.body);

    return () => {
      setTargetElement(null);
    };
  }, []);

  return (
    <>
      <StyledDiv
        className={clsx('custom-select', className, {
          'has-error': !!hasError,
        })}
        $rounded={rounded}
      >
        {loader && (
          <Loader
            color="primary"
            type="growing-loader"
            className="loader-overlay input-field-loader"
          />
        )}
        {label && (
          <Label
            className={clsx('label-text', isError ? 'error' : null)}
            text={label}
          />
        )}

        <Select
          ref={targetElement}
          options={options}
          name={name}
          className={clsx(`basic-select`, {
            'has-multiple-select': multiple,
            'has-error': hasError,
            disable: loader,
          })}
          classNamePrefix={clsx(classNamePrefix, 'select')}
          onChange={onChange}
          components={{ DropdownIndicator, ...components }}
          placeholder={placeholder}
          menuIsOpen={menuIsOpen}
          value={
            value || value === 0
              ? options.find((x) => x.value === value) || ''
              : ''
          }
          isMulti={multiple}
          isSearchable={!!isSearchable}
          hideSelectedOptions={!!hideSelectedOptions}
          closeMenuOnSelect={closeMenuOnSelect}
          menuPlacement={menuPlacement}
          defaultValue={defaultValue}
          isClearable={isClearable}
          maxMenuHeight={maxMenuHeight}
          isDisabled={loader || disabled}
          menuPortalTarget={targetElement}
          onBlur={onBlur}
        />

        {processing && (
          <Loader
            className={clsx('select-loader', loaderClassName)}
            type="spinner"
            color="primary"
          />
        )}
        {isError && <div className="error-message">{errorMsg}</div>}
      </StyledDiv>
    </>
  );
};
export default SelectField;
