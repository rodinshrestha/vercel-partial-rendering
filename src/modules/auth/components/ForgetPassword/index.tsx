'use client';

import React from 'react';

import { useFormik } from 'formik';

import useTranslations from '@/core/hooks/useTranslations';
import { publicAxios } from '@/core/utils/axios';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import InputField from '@/core/components/FormField/InputField';
import Button from '@/core/components/Button';
import Link from '@/core/components/Link';
import { forgotPasswordSchema } from '@/auth/schema/forgot-password';
import toastAlert from '@/core/utils/toast';
import Overlay from '@/core/components/Overlay';
import ImageWithFallback from '@/core/components/ImageWithFallback';
import { IconArrowRight } from '@/core/components/Icons';

import { FormTitle, FormWrapper, StyledSection } from '../style';

import { SuccessMessage } from './style';

const ForgotPassword = () => {
  const [isFormSubmit, setIsFormSubmit] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const { _t } = useTranslations();

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: forgotPasswordSchema(_t),
    onSubmit: (values) => {
      setIsLoading(true);
      publicAxios
        .post('/auth/forget/password', {
          email: values.email,
        })
        .then(() => setIsFormSubmit(true))
        .catch((err) => {
          setIsLoading(false);
          toastAlert(err, 'error');
        });
    },
  });
  return (
    <StyledSection>
      <Overlay />
      <ImageWithFallback
        src="/images/banner-img.png"
        alt="image"
        fill
        className="object-cover"
      />
      <Container>
        <Row>
          <Col md={9} lg={6} className="mx-auto">
            <FormWrapper className="forget-password-wrapper">
              <FormTitle>
                <h3>{_t('forgot_password', 'Forgot Password')}</h3>
              </FormTitle>
              {isFormSubmit ? (
                <SuccessMessage>
                  <p className="success-msg">
                    {_t(
                      'your_request_has_been_send_check_your_mail_to_change_password',
                      'Your request has been send, check your mail to change password'
                    )}
                  </p>
                  <Link href="/">
                    <Button
                      skin="primary"
                      variant="contained"
                      size="fullWidth"
                      className="home-btn"
                    >
                      {_t('go_home', 'Go Home')}
                    </Button>
                  </Link>
                </SuccessMessage>
              ) : (
                <form onSubmit={formik.handleSubmit}>
                  <InputField
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    label={_t('e_mail', 'E-mail')}
                    placeholder={_t('email', 'Email')}
                    error={Boolean(formik.errors.email)}
                    errorMsg={formik.errors.email}
                    touched={formik.touched.email}
                  />
                  <div className="btn-wrap">
                    <Button
                      skin="light"
                      type="submit"
                      size="lg"
                      variant="transparent"
                      disabled={!formik.isValid}
                      isLoading={isLoading}
                    >
                      {_t('submit', 'Submit')}
                      <IconArrowRight size={16} />
                    </Button>
                  </div>

                  <div className="link-wrap">
                    <Link href="/login">
                      {_t('back_to_login', 'Back to login')}
                    </Link>
                  </div>
                </form>
              )}
            </FormWrapper>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default ForgotPassword;
