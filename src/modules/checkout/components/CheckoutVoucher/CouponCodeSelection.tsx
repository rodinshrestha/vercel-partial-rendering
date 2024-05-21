import React from 'react';

import clsx from 'clsx';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { FormikProps } from 'formik';

import DropDownWrapper from '@/core/components/DropDownWrapper';
import useTranslations from '@/core/hooks/useTranslations';
import Button from '@/core/components/Button';
import { ucFirst } from '@/core/utils/string';
import useOutsideClick from '@/core/hooks/useOutsideClick';
import { formatWithDynamicKey } from '@/core/utils/format';

import { PromotionsType } from '../../types/promotion.types';

type FilterHeaderProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  optionCount: number;
};

const FilterHeader = ({
  isOpen,
  setIsOpen,
  optionCount,
}: FilterHeaderProps) => {
  const { _t } = useTranslations();

  return (
    <StyledHeader
      className={
        isOpen ? 'filter-header-wrapper active' : 'filter-header-wrapper'
      }
    >
      <h6
        className={
          isOpen ? 'filter-title-wrapper active' : 'filter-title-wrapper '
        }
        onClick={() => setIsOpen(true)}
      >
        <span>
          {_t('my_offers', 'My Offers')}{' '}
          {!!optionCount && <span className="optionCount">{optionCount}</span>}
        </span>

        <i
          className={clsx(isOpen ? 'icon-down_arrow' : 'icon-up_arrow', {
            active: isOpen,
          })}
        />
      </h6>
    </StyledHeader>
  );
};

type Props = {
  promotions: Array<PromotionsType>;
  handleApplyCoupon: (e: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  formik: FormikProps<{ code: string }>;
  couponCode: Array<string>;
  handleRemoveCoupon: (Code: string) => Promise<void>;
  couponResetLoader: boolean;
};

const CouponCodeSelection = ({
  promotions,
  handleApplyCoupon,
  isOpen,
  setIsOpen,
  isLoading,
  formik,
  couponCode,
  handleRemoveCoupon,
  couponResetLoader,
}: Props) => {
  const { _t } = useTranslations();
  const ref = React.useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const filterPromotions = promotions.filter(
    (item) => !item.expired && !item.redeemed
  );

  const promotionOptFormat = formatWithDynamicKey(promotions, {
    label: 'name',
    value: 'coupon_code',
  });

  return (
    <div ref={ref}>
      <DropDownWrapper
        isOpen={isOpen}
        header={
          <FilterHeader
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            optionCount={filterPromotions.length}
          />
        }
        className="facets-drop-down menu-up cart-offer-opt"
      >
        <StyledDiv className="checkbox-facets-wrapper">
          <div className="offer-opt-btn" onClick={() => setIsOpen(false)}>
            <span>
              {_t('my_offers', 'My Offers')}
              {!!filterPromotions.length && (
                <span className="optionCount">{filterPromotions.length}</span>
              )}
            </span>
            <i
              className={clsx(isOpen ? 'icon-down_arrow' : 'icon-up_arrow', {
                active: isOpen,
              })}
            />
          </div>
          {promotionOptFormat.map((item) => {
            return (
              <div className="checkbox-facets-inner-wrapper" key={item.value}>
                <div
                  className={clsx('input-groups', {
                    disable: !!couponCode?.length,
                  })}
                >
                  <input
                    type="checkbox"
                    id={item.value}
                    value={item.value}
                    onChange={(e) => {
                      const { value = '' } = e.target;
                      formik.setFieldValue('code', value);
                    }}
                    disabled={!!couponCode?.length}
                    checked={formik.values.code === item.value}
                  />
                  <label htmlFor={item.value}>{ucFirst(item.label)}</label>
                </div>
              </div>
            );
          })}
          <div className="btn-wrap">
            <Button
              skin="primary"
              variant="contained"
              onClick={() => handleApplyCoupon(formik.values.code)}
              isLoading={isLoading}
              disabled={!formik.values.code}
              fullWidth
            >
              {_t('apply', 'Apply')}
            </Button>

            <Button
              skin="primary"
              variant="contained"
              onClick={() => handleRemoveCoupon(couponCode[0])}
              isLoading={couponResetLoader}
              disabled={!couponCode.length}
              fullWidth
            >
              {_t('reset_coupon', 'Reset Coupon')}
            </Button>
          </div>
        </StyledDiv>
      </DropDownWrapper>
    </div>
  );
};

export default CouponCodeSelection;

const StyledDiv = styled.div`
  ${({ theme }) => css`
    &.checkbox-facets-wrapper {
      background-color: ${theme.coreColor.light.default.background};
      border: 1px solid ${theme.color.grey[1200]};
      padding: ${rem(12)};
      border-radius: 20px;

      .offer-opt-btn {
        display: flex;
        justify-content: space-between;
        flex-grow: 1;
        ${theme.fontFamily.semibold}
        padding: 0 ${rem(12)}  ${rem(10)};

        .optionCount {
          display: inline-flex;
          font-size: ${rem(9)};
          line-height: ${rem(14)};
          background-color: ${theme.coreColor.danger.default.background};
          border-radius: 50%;
          color: ${theme.coreColor.dark.default.color};
          width: 14px;
          height: 14px;
          align-items: center;
          justify-content: center;
        }
      }

      .btn-wrap {
        border-top: 1px solid ${theme.color.grey[1200]};
        padding: ${rem(15)} ${rem(10)} ${rem(5)};
        text-align: center;

        button {
          max-width: 182px;
        }
      }

      .checkbox-facets-inner-wrapper {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid ${theme.color.grey[1200]};
        padding: ${rem(15)} ${rem(10)};

        .input-groups {
          &.disable {
            opacity: 0.5;
            cursor: not-allowed;
          }
          label {
            ${theme.fontFamily.semibold}
          }

          input {
            position: absolute;
            left: -9999px;
            &.disable {
              opacity: 0.5;
            }

            + label {
              transition: 0.3s ease all;
              position: relative;
              padding-left: 30px;
              cursor: pointer;
              line-height: 20px;
              display: inline-block;
              font-size: ${rem(14)};

              &::before,
              &::after {
                content: '';
                position: absolute;
                transition: 0.3s ease all;
              }

              &::before {
                left: 0;
                top: 0;
                width: 18px;
                height: 18px;
                background-color: transparent;
                border: 1px solid ${theme.color.grey[900]};
                border-radius: 4px;
              }

              &::after {
                content: '\e910';
                font-family: 'dogman' !important;
                top: 3px;
                left: 3px;
                opacity: 0;
                font-size: 12px;
                line-height: 12px;
              }
            }
            &:checked + label:after {
              opacity: 1;
            }
          }
        }
      }
    }
  `}
`;

const StyledHeader = styled.div`
  ${({ theme }) => css`
    &.filter-header-wrapper {
      display: flex;

      h6 {
        padding: ${rem(10)} ${rem(15)};
        border-radius: ${theme.radius};
        position: relative;
        font-size: ${rem(14)};
        line-height: ${rem(16)};
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        transition: 0.3s ease all;
        border: 1px solid ${theme.color.grey[1200]};

        @media (max-width: ${theme.breakPoints.mobile}) {
          padding: ${rem(10)};
          font-size: ${rem(12)};
          line-height: ${rem(14)};
        }

        &.active {
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
          width: 100%;
          opacity: 0;
          visibility: hidden;
        }
      }

      i {
        font-size: ${rem(12)};
        line-height: ${rem(16)};
      }

      .optionCount {
        display: inline-flex;
        font-size: ${rem(9)};
        line-height: ${rem(14)};
        background-color: ${theme.coreColor.danger.default.background};
        border-radius: 50%;
        color: ${theme.coreColor.dark.default.color};
        width: 14px;
        height: 14px;
        align-items: center;
        justify-content: center;
      }
    }
  `}
`;
