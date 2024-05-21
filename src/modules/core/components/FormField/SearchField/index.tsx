import React from 'react';

import styled from 'styled-components';
import { css } from 'styled-components';
import { rem } from 'polished';

import useTranslations from '@/core/hooks/useTranslations';

import InputField from '../InputField';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | null;
  className?: string;
  error?: boolean;
  touched?: boolean;
  errorMsg?: string;
  loader?: boolean;
  reference?: React.RefObject<HTMLInputElement>;
  placeholder?: string;
  type?: string;
  hasIcon?: boolean;
}

const SearchField = ({ type = 'text', hasIcon = true, ...rest }: IProps) => {
  const handleSearch = () => {};
  const { _t } = useTranslations();
  return (
    <StyledSearchField className="search">
      <InputField type={type} placeholder={_t('search', 'Search')} {...rest} />
      {hasIcon && (
        <div className="search-wrap">
          <i className="icon-search" onClick={handleSearch} />
        </div>
      )}
    </StyledSearchField>
  );
};

export default SearchField;

const StyledSearchField = styled.div`
  ${({ theme }) => css`
    flex-grow: 1;
    position: relative;

    .input-field {
      input {
        ${theme.fontFamily.semibold}
        width: 100%;
        border-radius: 29px;
        padding: ${rem(10)} ${rem(15)};
        background-color: ${theme.color.white[1000]};
        border: none;
        padding-right: ${rem(30)};
        ${theme.fontFamily.semibold}
        line-height: ${rem(20)};
        font-size: ${rem(13)};

        &::placeholder {
          ${theme.fontFamily.semibold}
          color: ${theme.coreColor.body.default.color};
        }

        &:focus {
          outline: none;
          box-shadow: none;
        }

        &:-webkit-autofill,
        &:-internal-autofill-selected {
          background-color: transparent;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }

    .search-wrap {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: inherit;

      i {
        font-size: ${rem(14)};
        color: inherit;
        cursor: pointer;
        transition: 0.3s ease all;

        @media (hover: hover) and (pointer: fine) {
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  `}
`;
