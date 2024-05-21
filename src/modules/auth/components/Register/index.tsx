'use client';
import React from 'react';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import Link from '@/core/components/Link';
import useTranslations from '@/core/hooks/useTranslations';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import Button from '@/core/components/Button';
import InputField from '@/core/components/FormField/InputField';
import toastAlert from '@/core/utils/toast';
import CheckBox from '@/core/components/FormField/CheckBox';
import { registerSchema } from '@/auth/schema/register-schema';
import { publicAxios } from '@/core/utils/axios';
import Overlay from '@/core/components/Overlay';
import ImageWithFallback from '@/core/components/ImageWithFallback';
import { IconArrowRight } from '@/core/components/Icons';
import PhoneField from '@/core/components/FormField/PhoneField';

import { FormTitle, FormWrapper, StyledSection } from '../style';

const initialState = {
  email: '',
  password: '',
  confirm_password: '',
  first_name: '',
  last_name: '',
  terms: false,
  phone: '',
  dob: '',
};

const Register = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const { _t } = useTranslations();
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialState,
    validateOnMount: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        const {
          email,
          first_name,
          confirm_password,
          last_name,
          password,
          phone,
          dob,
        } = values;
        setIsLoading(true);
        await publicAxios
          .post('/sf/customer/registration', {
            email,
            first_name,
            last_name,
            password,
            phone,
            dob,
            password_confirmation: confirm_password,
          })
          .then((res) => {
            toastAlert(res.data?.message, 'success');
          });
        return router.push('/login');
      } catch (e: unknown) {
        const response = (e as any).response;
        if (response.status === 422 && response.data?.message) {
          const serverErrors: Record<string, string> = {};
          Object.entries(
            response.data.message as Record<string, Array<string>>
          ).forEach(([key, value]) => {
            const [eqFirst] = value;
            serverErrors[key] = eqFirst;
          });
          formik.setErrors(serverErrors);
        } else {
          toastAlert('Something went wrong', 'custom-error');
        }
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: registerSchema(_t),
  });

  const handleAcceptTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    formik.setFieldValue(e.target.name, checked);
  };

  return (
    <StyledSection className="pt-75 pb-75">
      <Overlay />
      <ImageWithFallback
        src="/images/banner-img.png"
        alt="image"
        fill
        className="object-cover"
      />
      <Container>
        <Row>
          <Col md={8} className="mx-auto">
            <div className="section-title text-uppercase mb-35 text-center text-white">
              <h1>
                <strong>{_t('the_customer_club', 'The customer club')}</strong>
              </h1>
            </div>
            <FormWrapper className="register-form">
              <FormTitle>
                <h3>
                  <strong>{_t('register_title', 'Register')}</strong>
                </h3>
              </FormTitle>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-row">
                  <div className="form-col full-col">
                    <InputField
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      label={_t('input_email', 'E-mail')}
                      placeholder={_t('email', 'Email')}
                      error={Boolean(formik.errors.email)}
                      errorMsg={formik.errors.email}
                      onBlur={formik.handleBlur}
                      touched={formik.touched.email}
                    />
                  </div>
                  <div className="form-col half-col">
                    <InputField
                      name="first_name"
                      type="text"
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                      label={_t('first_name', 'First Name')}
                      placeholder={_t('first_name', 'First Name')}
                      error={Boolean(formik.errors.first_name)}
                      errorMsg={formik.errors.first_name}
                      onBlur={formik.handleBlur}
                      touched={formik.touched.first_name}
                    />
                  </div>
                  <div className="form-col half-col">
                    <InputField
                      name="last_name"
                      type="text"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                      label={_t('last_name', 'last Name')}
                      placeholder={_t('last_name', 'Last Name')}
                      error={Boolean(formik.errors.last_name)}
                      errorMsg={formik.errors.last_name}
                      onBlur={formik.handleBlur}
                      touched={formik.touched.last_name}
                    />
                  </div>
                  <div className=" form-col half-col">
                    <InputField
                      name="dob"
                      type="date"
                      label={_t('dob', 'Dob')}
                      value={formik.values.dob}
                      errorMsg={formik.errors.dob}
                      touched={formik.touched.dob}
                      error={Boolean(formik.errors.dob)}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="form-col half-col">
                    <PhoneField
                      label={_t('input_phone', 'Phone')}
                      placeholder={_t('input_phone', 'Phone')}
                      errorMsg={formik.errors.phone}
                      touched={formik.touched.phone}
                      error={Boolean(formik.errors.phone)}
                      value={formik.values.phone}
                      onBlur={() => formik.setFieldTouched('phone', true)}
                      onChange={(value) => formik.setFieldValue('phone', value)}
                    />
                  </div>
                  <div className="form-col half-col">
                    <InputField
                      name="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      label="Password"
                      placeholder="Password"
                      error={Boolean(formik.errors.password)}
                      errorMsg={formik.errors.password}
                      onBlur={formik.handleBlur}
                      touched={formik.touched.password}
                    />
                  </div>
                  <div className="form-col half-col">
                    <InputField
                      name="confirm_password"
                      type="password"
                      value={formik.values.confirm_password}
                      onChange={formik.handleChange}
                      label={_t('confirm_password', 'Confirm Password')}
                      placeholder={_t('confirm_password', 'Confirm Password')}
                      error={Boolean(formik.errors.confirm_password)}
                      errorMsg={formik.errors.confirm_password}
                      onBlur={formik.handleBlur}
                      touched={formik.touched.confirm_password}
                    />
                  </div>
                  <div className="form-col half-col">
                    <CheckBox
                      onChange={handleAcceptTerms}
                      name="terms"
                      id="terms"
                      label={
                        <span>
                          {_t('accept', 'Accept')}
                          <Link newTab href="/page/terms-and-conditions">
                            {' '}
                            {_t('terms_&_conditions', 'terms & conditions')}
                          </Link>
                        </span>
                      }
                      checked={formik.values.terms}
                    />
                  </div>
                </div>

                <div className="btn-wrap">
                  <Button
                    skin="light"
                    variant="transparent"
                    type="submit"
                    size={'fullWidth'}
                    disabled={!formik.isValid && Boolean(formik.submitCount)}
                    isLoading={isLoading}
                  >
                    {_t('sign_up', 'Sign up')}
                    <IconArrowRight size={18} />
                  </Button>
                </div>

                <div className="link-wrap">
                  <Link href="/login">
                    {_t('already_have_an_account', 'Already have an account')}?
                  </Link>
                </div>
              </form>
            </FormWrapper>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};
export default Register;
