'use client';

import React from 'react';

import { useFormik } from 'formik';
import { useSearchParams, useRouter } from 'next/navigation';

import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import InputField from '@/core/components/FormField/InputField';
import Button from '@/core/components/Button';
import useTranslations from '@/core/hooks/useTranslations';
import { publicAxios } from '@/core/utils/axios';
import toastAlert from '@/core/utils/toast';
import { resetPasswordSchema } from '@/auth/schema/reset-password';

import { FormTitle, FormWrapper, StyledSection } from '../style';

// import { FormWrapper } from './style';

const initialstate = {
  newPassword: '',
  confirmPassword: '',
};

const ResetPassword = ({ token }: { token: string }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();
  const { _t } = useTranslations();

  const query = useSearchParams();
  const email = query.get('email');

  const formik = useFormik({
    initialValues: initialstate,
    validationSchema: resetPasswordSchema(_t),
    onSubmit: (values) => {
      setIsLoading(true);
      publicAxios
        .post(`/auth/reset/password`, {
          email: email,
          token: token,
          password: values.newPassword,
          password_confirmation: values.confirmPassword,
        })
        .then(() => {
          router.replace(`/login`);
        })
        .catch((err) => {
          setIsLoading(false);
          toastAlert(err, 'error');
        });
    },
  });

  return (
    <StyledSection>
      <Container>
        <Row>
          <Col lg={6} md={9} className="mx-auto">
            <FormWrapper>
              <FormTitle>
                <h2>
                  <strong>{_t('reset', 'Reset Password')}</strong>
                </h2>
              </FormTitle>
              <form onSubmit={formik.handleSubmit}>
                <InputField
                  name="newPassword"
                  type="password"
                  className="password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  label={_t('new_password', 'New Password')}
                  placeholder={_t('new_password', 'New Password')}
                  error={Boolean(formik.errors.newPassword)}
                  errorMsg={formik.errors.newPassword}
                  touched={formik.touched.newPassword}
                  onBlur={formik.handleBlur}
                />
                <InputField
                  name="confirmPassword"
                  type="password"
                  className="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  label={_t('confirm_password', 'Confirm Password')}
                  placeholder={_t('confirm_password', 'Confirm Password')}
                  error={Boolean(formik.errors.confirmPassword)}
                  errorMsg={formik.errors.confirmPassword}
                  touched={formik.touched.confirmPassword}
                  onBlur={formik.handleBlur}
                />

                <Button
                  className="reset-password"
                  skin="primary"
                  type="submit"
                  size="fullWidth"
                  variant="contained"
                  isLoading={isLoading}
                  disabled={!formik.isValid || !formik.dirty}
                >
                  {_t('reset_password', 'RESET PASSWORD')}
                </Button>
              </form>
            </FormWrapper>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default ResetPassword;
