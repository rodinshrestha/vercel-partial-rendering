import React from 'react';

import clsx from 'clsx';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import useResolver from '@/core/hooks/useResolver';

import { LableStyle } from '../InputField/style';

import { StyledDiv } from './style';

type Props = {
  onChange: (value: string) => void;
  onBlur: () => void;
  label?: string;
  errorMsg?: string;
  error?: boolean;
  touched?: boolean;
  value?: string;
  placeholder?: string;
};

const PhoneField = ({
  label,
  onChange,
  errorMsg,
  touched,
  error,
  onBlur,
  value,
  placeholder,
}: Props) => {
  const isError = error && touched;

  const { channel } = useResolver();

  return (
    <StyledDiv className={clsx({ error: isError })}>
      {label && (
        <LableStyle
          className={clsx({
            error: !!isError,
          })}
        >
          {label}
        </LableStyle>
      )}
      <PhoneInput
        country={channel?.code || 'se'}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        alwaysDefaultMask
        jumpCursorToEnd
      />
      {isError && <div className="error-message">{errorMsg}</div>}
    </StyledDiv>
  );
};

export default PhoneField;
