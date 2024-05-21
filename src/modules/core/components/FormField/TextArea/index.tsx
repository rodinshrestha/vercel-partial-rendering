import React from 'react';

import clsx from 'clsx';

import { LableStyle } from '../Input/style';
import Loader from '../../Loader';

import { StyledDiv, TextAreaStyle } from './style';

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | null;
  className?: string;
  error?: boolean;
  touched?: boolean;
  errorMsg?: string;
  loader?: boolean;
  placeholder?: string;
  cols?: number;
  rows?: number;
}

const TextArea = (props: IProps) => {
  const {
    id,
    className,
    label,
    name,
    touched,
    errorMsg,
    error,
    loader,
    placeholder,
    cols,
    rows,
    ...rest
  } = props;

  const isError = error && touched;

  return (
    <>
      <StyledDiv className="text-field">
        {loader && (
          <Loader
            color="primary"
            type="growing-loader"
            className="loader-overlay input-field-loader"
          />
        )}
        {label && (
          <LableStyle
            className={clsx({
              error: !!isError,
              disabled: !!props.disabled,
            })}
            htmlFor={id}
          >
            {label}
          </LableStyle>
        )}
        <TextAreaStyle
          className={clsx(className, {
            error: !!isError,
            disabled: !!props.disabled,
            loader: loader,
          })}
          placeholder={placeholder}
          name={name}
          rows={rows}
          cols={cols}
          {...rest}
        />
        {isError && <div className="error-message">{errorMsg}</div>}
      </StyledDiv>
    </>
  );
};

export default TextArea;
