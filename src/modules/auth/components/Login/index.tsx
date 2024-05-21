"use client";
import React from "react";

import { useFormik } from "formik";
import { signIn } from "next-auth/react";

import Link from "@/core/components/Link";
import useTranslations from "@/core/hooks/useTranslations";
import { Container } from "@/core/components/Grid/Container";
import { Row } from "@/core/components/Grid/Row";
import { Col } from "@/core/components/Grid/Col";
import Button from "@/core/components/Button";
import InputField from "@/core/components/FormField/InputField";
import { loginSchema } from "@/auth/schema/login";
import toastAlert from "@/core/utils/toast";
import ImageWithFallback from "@/core/components/ImageWithFallback";
import Overlay from "@/core/components/Overlay";
import { IconArrowRight } from "@/core/components/Icons";
import { getCallBackURL } from "@/core/utils/url";

import { FormTitle, FormWrapper, StyledSection } from "../style";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const { _t } = useTranslations();

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: async (values, { setFieldValue, setFieldTouched }) => {
      setIsLoading(true);

      signIn("credentials", {
        ...values,
        redirect: false,
      }).then((resp) => {
        if (resp?.error) {
          toastAlert(resp.error, "custom-error");
          setIsLoading(false);
          setFieldValue("password", "");
          setFieldTouched("password", false);
        } else {
          const URL = getCallBackURL() || "/";
          window.location.replace(URL);
        }
      });
    },
    validationSchema: loginSchema(_t),
  });

  return (
    <StyledSection className="pt-35 pb-35">
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
            <div className="section-title text-uppercase mb-35 text-center text-white">
              <h1>
                <strong>{_t("the_customer_club", "The customer club")}</strong>
              </h1>
            </div>
            <FormWrapper>
              <FormTitle className="text-uppercase">
                <h3>
                  <strong>{_t("log_in", "Log In")}</strong>
                </h3>
              </FormTitle>
              <form onSubmit={formik.handleSubmit}>
                <InputField
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  label={_t("email", "E-mail")}
                  placeholder={_t("email", "E-mail")}
                  error={Boolean(formik.errors.email)}
                  errorMsg={formik.errors.email}
                  touched={formik.touched.email}
                />
                <InputField
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  label={_t("password", "Password")}
                  placeholder={_t("password", "Password")}
                  error={Boolean(formik.errors.password)}
                  errorMsg={formik.errors.password}
                  touched={formik.touched.password}
                />
                <div className="btn-wrap">
                  <Button
                    skin="light"
                    variant="transparent"
                    type="submit"
                    size="sm"
                    disabled={!formik.isValid}
                    isLoading={isLoading}
                  >
                    {_t("log_in", "Login")}
                    <IconArrowRight size={18} />
                  </Button>
                </div>
                <div className="link-wrap">
                  <Link className="register-link" href="/register">
                    {_t("no_account", "No account")}?
                  </Link>
                  <Link href="/forgot-password">
                    {_t("forgot_password", "Forgot password")}?
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
export default Login;
