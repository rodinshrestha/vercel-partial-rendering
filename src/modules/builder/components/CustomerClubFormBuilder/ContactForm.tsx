'use client';
import React from 'react';

import { rem } from 'polished';
import styled, { css } from 'styled-components';
import { useFormik } from 'formik';

import InputField from '@/core/components/FormField/Input';
import Button from '@/core/components/Button';
import useTranslations from '@/core/hooks/useTranslations';
import { publicAxios } from '@/core/utils/axios';
import toastAlert from '@/core/utils/toast';
import { IconArrowRight } from '@/core/components/Icons';
import Link from '@/core/components/Link';
import PhoneField from '@/core/components/FormField/PhoneField';

import { schemaValidation } from './schemaValidation';

const ContactForm = ({ title }: { title: string | null }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const { _t } = useTranslations();

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      social_security_number: '',
      subscribe: false,
    },
    validationSchema: schemaValidation(_t),
    onSubmit: (values) => {
      setIsLoading(true);
      publicAxios
        .post('sf/request/create-user', {
          ...values,
        })
        .then((res) => {
          toastAlert(res.data.message, 'success');
          formik.resetForm();
        })
        .catch((err) => {
          toastAlert(err, 'error');
        })
        .finally(() => setIsLoading(false));
    },
  });

  return (
    <StyledFormWrapper>
      <h2>
        <strong>{title}</strong>
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="two-col">
          <div className="input-wrapper">
            <InputField
              name="email"
              label={_t('email', 'Email')}
              type="email"
              placeholder={_t('email', 'Email')}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.email)}
              errorMsg={formik.errors.email}
              touched={formik.touched.email}
            />
          </div>
          <div className="input-wrapper">
            <InputField
              name="first_name"
              label={_t('first_name', 'First Name')}
              type="text"
              placeholder={_t('first_name', 'First Name')}
              value={formik.values.first_name}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.first_name)}
              errorMsg={formik.errors.first_name}
              touched={formik.touched.first_name}
            />
          </div>
          <div className="input-wrapper">
            <InputField
              name="last_name"
              label={_t('last_name', 'Last Name')}
              type="text"
              placeholder={_t('last_name', 'Last Name')}
              value={formik.values.last_name}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.last_name)}
              errorMsg={formik.errors.last_name}
              touched={formik.touched.last_name}
            />
          </div>
          <div className="input-wrapper">
            <PhoneField
              label={_t('phone_number', 'Phone Number')}
              placeholder={_t('phone_number', 'Phone Number')}
              error={Boolean(formik.errors.phone)}
              value={formik.values.phone}
              onBlur={() => formik.setFieldTouched('phone', true)}
              onChange={(value) => formik.setFieldValue('phone', value)}
              errorMsg={formik.errors?.phone}
              touched={formik.touched?.phone}
            />
          </div>
          <div className="input-wrapper">
            <InputField
              label={_t(
                'social_security_number_voluntary',
                'Social Security Number (Voluntary)'
              )}
              name="social_security_number"
              type="text"
              placeholder={_t(
                'social_security_number_voluntary',
                'Social Secirity Number (Voluntary)'
              )}
              value={formik.values.social_security_number}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.social_security_number)}
              errorMsg={formik.errors.social_security_number}
              touched={formik.touched.social_security_number}
            />
          </div>

          <div className="input-wrapper input-wrapper-accept">
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              checked={formik.values.subscribe}
              onChange={formik.handleChange}
            />
            <label htmlFor="subscribe">
              {_t('i_agree_the', 'I agree the')}{' '}
              <Link href={`/page/privacy-policy`}>
                {_t('privacy_policy', 'privacy policy')}
              </Link>
            </label>
          </div>
        </div>

        <div className="btn-wrap">
          <Button
            skin="body"
            variant="transparent"
            type="submit"
            isLoading={isLoading}
            disabled={isLoading || !formik.values.subscribe}
            size="md"
          >
            {_t('Join_the_customer_club', 'Join the customer club')}
            <IconArrowRight size={18} />
          </Button>
        </div>
      </form>
    </StyledFormWrapper>
  );
};
export default ContactForm;

const StyledFormWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.coreColor.primary.default.background};
    height: 100%;
    padding: ${rem(75)} ${rem(50)};

    @media (max-width: ${theme.breakPoints.tablet}) {
      padding: ${rem(50)} ${rem(30)};
    }

    @media (max-width: ${theme.breakPoints.mobile}) {
      padding: ${rem(50)} ${rem(20)};
    }

    h2 {
      margin-bottom: ${rem(75)};
      text-transform: uppercase;

      @media (max-width: ${theme.breakPoints.tablet}) {
        margin-bottom: ${rem(50)};
      }
    }

    h5,
    .text {
      margin-bottom: ${rem(40)};
      font-size: ${rem(16)};
      line-height: ${rem(26)};

      @media (max-width: ${theme.breakPoints.largeDesktop}) {
        margin-bottom: ${rem(20)};
        font-size: ${rem(16)};
      }
    }

    .two-col {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10px;
      align-items: flex-end;

      .input-wrapper {
        padding: 0 ${rem(10)};
        flex: 0 0 50%;
        max-width: 50%;
      }
    }

    .input-wrapper {
      display: flex;
      margin-bottom: ${rem(40)};

      @media (max-width: ${theme.breakPoints.tablet}) {
        margin-bottom: ${rem(30)};
      }

      h5 {
        font-size: ${rem(21)};
        margin-left: ${rem(10)};

        a {
          text-decoration: underline;
        }
      }

      .input-wrap {
        input {
          border: 0;
          border-bottom: 1px solid ${theme.coreColor.body.default.color};
        }
      }
    }

    .btn-wrap {
      text-align: center;
      margin-top: ${rem(20)};
    }

    .input-wrapper-accept {
      font-size: ${rem(12)};
      line-height: ${rem(16)};
      letter-spacing: ${rem(1.2)};
      text-transform: uppercase;

      label {
        line-height: 19px;
      }

      input {
        opacity: 0;
        visibility: hidden;
        text-indent: -99999px;
        display: none;

        + label {
          position: relative;
          display: block;
          align-items: center;
          padding-left: 25px;
          cursor: pointer;

          a {
            text-decoration: underline;
          }

          &::before {
            content: '';
            width: 14px;
            height: 14px;
            display: inline-block;
            border: 1px solid ${theme.coreColor.body.default.color};
            position: absolute;
            top: 0;
            left: 0;
          }

          &::after {
            content: '';
            width: 12px;
            height: 12px;
            position: absolute;
            top: 2px;
            left: 2px;
          }
        }

        &:checked {
          + label {
            &::after {
              content: '';
              background-color: #ccc;
              background-color: ${theme.coreColor.body.default.color};
            }
          }
        }
      }
    }
  `}
`;
